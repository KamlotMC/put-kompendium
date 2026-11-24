import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { openDatabase, computeSm2 } from './db.js';
import { seedDatabase } from './seed.js';
import { analyzeIpv4Subnet, generateSubnetExercise } from './subnet.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function safeParseJson(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

export function createApp(dbPath) {
  const db = openDatabase(dbPath);
  seedDatabase(db);

  const app = express();
  app.disable('x-powered-by');
  if (process.env.TRUST_PROXY === 'true' || process.env.TRUST_PROXY === '1') {
    app.set('trust proxy', 1);
  }

  const corsOriginEnv = (process.env.CORS_ORIGIN || '*').trim();
  const corsOptions =
    corsOriginEnv === '*'
      ? {}
      : {
          origin: corsOriginEnv
            .split(',')
            .map((o) => o.trim())
            .filter(Boolean),
        };
  app.use(cors(corsOptions));
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
  app.use(express.json({ limit: '2mb' }));

  // Serve extracted lecture slide images
  app.use('/media', express.static(path.join(ROOT_DIR, 'public/media'), { maxAge: '7d' }));

  const logActivity = (subjectId, activityType, detail, xp = 10) => {
    db.prepare(
      `INSERT INTO study_activity (subject_id, activity_type, detail, xp_earned) VALUES (?, ?, ?, ?)`
    ).run(subjectId, activityType, detail, xp);
  };

  // --- Health ---
  app.get('/api/health', (_req, res) => {
    const subjects = db.prepare('SELECT COUNT(*) AS c FROM subjects').get().c;
    const chapters = db.prepare('SELECT COUNT(*) AS c FROM chapters').get().c;
    const topics = db.prepare('SELECT COUNT(*) AS c FROM exam_topics').get().c;
    const flashcards = db.prepare('SELECT COUNT(*) AS c FROM flashcards').get().c;
    const quizzes = db.prepare('SELECT COUNT(*) AS c FROM quiz_questions').get().c;
    res.json({ ok: true, counts: { subjects, chapters, topics, flashcards, quizzes } });
  });

  // --- Helper for subject metrics ---
  function getSubjectWithStats(subjectRow) {
    const sid = subjectRow.id;
    const chaptersTotal = db.prepare('SELECT COUNT(*) AS c FROM chapters WHERE subject_id = ?').get(sid).c;
    const chaptersDone = db
      .prepare(
        `SELECT COUNT(*) AS c FROM chapter_progress cp
         JOIN chapters c ON c.id = cp.chapter_id
         WHERE c.subject_id = ? AND cp.completed = 1`
      )
      .get(sid).c;

    const flashcardsTotal = db.prepare('SELECT COUNT(*) AS c FROM flashcards WHERE subject_id = ?').get(sid).c;
    const nowIso = new Date().toISOString();
    const flashcardsDue = db
      .prepare(
        `SELECT COUNT(*) AS c FROM flashcards f
         LEFT JOIN flashcard_reviews r ON r.flashcard_id = f.id
         WHERE f.subject_id = ? AND (r.flashcard_id IS NULL OR r.due_date <= ?)`
      )
      .get(sid, nowIso).c;
    const flashcardsMastered = db
      .prepare(
        `SELECT COUNT(*) AS c FROM flashcards f
         JOIN flashcard_reviews r ON r.flashcard_id = f.id
         WHERE f.subject_id = ? AND r.repetitions >= 2`
      )
      .get(sid).c;

    const quizzesTotal = db.prepare('SELECT COUNT(*) AS c FROM quiz_questions WHERE subject_id = ?').get(sid).c;
    const attemptsStats = db
      .prepare(
        `SELECT COUNT(*) AS count, COALESCE(ROUND(AVG(score_percent), 1), 0) AS avg_score,
                COALESCE(MAX(score_percent), 0) AS best_score
         FROM exam_attempts WHERE subject_id = ?`
      )
      .get(sid);

    const topicsTotal = db.prepare('SELECT COUNT(*) AS c FROM exam_topics WHERE subject_id = ?').get(sid).c;
    const topicsMastered = db
      .prepare(
        `SELECT COUNT(*) AS c FROM exam_topic_progress p
         JOIN exam_topics t ON t.id = p.topic_id
         WHERE t.subject_id = ? AND p.status = 'mastered'`
      )
      .get(sid).c;
    const topicsLearning = db
      .prepare(
        `SELECT COUNT(*) AS c FROM exam_topic_progress p
         JOIN exam_topics t ON t.id = p.topic_id
         WHERE t.subject_id = ? AND p.status = 'learning'`
      )
      .get(sid).c;

    const glossaryTotal = db.prepare('SELECT COUNT(*) AS c FROM glossary_terms WHERE subject_id = ?').get(sid).c;

    // Composite readiness score (0..100)
    let readiness = 0;
    if (subjectRow.status === 'ready') {
      const chPct = chaptersTotal ? (chaptersDone / chaptersTotal) * 100 : 0;
      const topPct = topicsTotal ? ((topicsMastered + topicsLearning * 0.4) / topicsTotal) * 100 : 0;
      const fcPct = flashcardsTotal ? (flashcardsMastered / flashcardsTotal) * 100 : 0;
      const qzPct = attemptsStats.count > 0 ? attemptsStats.avg_score : 0;
      readiness = Math.round(chPct * 0.25 + topPct * 0.35 + fcPct * 0.2 + qzPct * 0.2);
    }

    const { source_dir: _omitSourceDir, ...publicSubject } = subjectRow;
    return {
      ...publicSubject,
      meta: safeParseJson(subjectRow.meta_json, {}),
      stats: {
        chaptersTotal,
        chaptersDone,
        flashcardsTotal,
        flashcardsDue,
        flashcardsMastered,
        quizzesTotal,
        attemptsCount: attemptsStats.count,
        avgScore: attemptsStats.avg_score,
        bestScore: attemptsStats.best_score,
        topicsTotal,
        topicsMastered,
        topicsLearning,
        glossaryTotal,
        readiness,
      },
    };
  }

  // --- Global Overview ---
  app.get('/api/overview', (_req, res) => {
    const subjectRows = db.prepare('SELECT * FROM subjects ORDER BY status ASC, title ASC').all();
    // Put ready subjects first
    subjectRows.sort((a, b) => (a.status === 'ready' ? -1 : 1) - (b.status === 'ready' ? -1 : 1));
    const subjects = subjectRows.map(getSubjectWithStats);

    const totalXp = db.prepare('SELECT COALESCE(SUM(xp_earned), 0) AS xp FROM study_activity').get().xp;
    const activeDays = db
      .prepare(`SELECT COUNT(DISTINCT substr(created_at, 1, 10)) AS days FROM study_activity`)
      .get().days;
    const recentActivity = db
      .prepare('SELECT * FROM study_activity ORDER BY id DESC LIMIT 12')
      .all();
    const subnetStats = db
      .prepare(
        `SELECT COUNT(*) AS total, COALESCE(SUM(is_correct), 0) AS correct
         FROM subnet_sessions`
      )
      .get();

    res.json({
      subjects,
      summary: {
        totalXp,
        activeDays,
        subnetTotal: subnetStats.total,
        subnetCorrect: subnetStats.correct,
        subnetAccuracy: subnetStats.total ? Math.round((subnetStats.correct / subnetStats.total) * 100) : 0,
      },
      recentActivity,
    });
  });

  // --- Subjects ---
  app.get('/api/subjects', (_req, res) => {
    const rows = db.prepare('SELECT * FROM subjects').all();
    rows.sort((a, b) => (a.status === 'ready' ? -1 : 1) - (b.status === 'ready' ? -1 : 1));
    res.json(rows.map(getSubjectWithStats));
  });

  app.get('/api/subjects/:slug', (req, res) => {
    const subject = db.prepare('SELECT * FROM subjects WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!subject) return res.status(404).json({ error: 'Przedmiot nie został znaleziony.' });

    const chapters = db
      .prepare(
        `SELECT c.id, c.order_index, c.slug, c.title, c.subtitle, c.lecture_ref,
                c.estimated_minutes, c.summary, c.exam_questions_json, c.figures_json,
                COALESCE(p.completed, 0) AS completed,
                COALESCE(p.read_percent, 0) AS read_percent,
                COALESCE(p.notes, '') AS notes,
                p.last_visited_at
         FROM chapters c
         LEFT JOIN chapter_progress p ON p.chapter_id = c.id
         WHERE c.subject_id = ?
         ORDER BY c.order_index ASC`
      )
      .all(subject.id)
      .map((c) => {
        const fcCount = db.prepare('SELECT COUNT(*) AS n FROM flashcards WHERE chapter_id = ?').get(c.id).n;
        const qzCount = db.prepare('SELECT COUNT(*) AS n FROM quiz_questions WHERE chapter_id = ?').get(c.id).n;
        return {
          ...c,
          completed: Boolean(c.completed),
          exam_questions: safeParseJson(c.exam_questions_json, []),
          figures_count: safeParseJson(c.figures_json, []).length,
          flashcards_count: fcCount,
          quizzes_count: qzCount,
        };
      });

    const recentAttempts = db
      .prepare('SELECT * FROM exam_attempts WHERE subject_id = ? ORDER BY id DESC LIMIT 8')
      .all(subject.id)
      .map((a) => ({ ...a, answers: safeParseJson(a.answers_json, []) }));

    res.json({
      ...getSubjectWithStats(subject),
      chapters,
      recentAttempts,
    });
  });

  // --- Chapters ---
  app.get('/api/chapters/:id', (req, res) => {
    const ch = db
      .prepare(
        `SELECT c.*, COALESCE(p.completed, 0) AS completed, COALESCE(p.read_percent, 0) AS read_percent,
                COALESCE(p.notes, '') AS notes, p.last_visited_at
         FROM chapters c
         LEFT JOIN chapter_progress p ON p.chapter_id = c.id
         WHERE c.id = ? OR c.slug = ?`
      )
      .get(req.params.id, req.params.id);

    if (!ch) return res.status(404).json({ error: 'Rozdział nie istnieje.' });

    const examNums = safeParseJson(ch.exam_questions_json, []);
    const linkedTopics = db
      .prepare(
        `SELECT t.id, t.number, t.question, t.short_answer, COALESCE(p.status, 'not_started') AS status
         FROM exam_topics t
         LEFT JOIN exam_topic_progress p ON p.topic_id = t.id
         WHERE t.subject_id = ? AND t.chapter_id = ?
         ORDER BY t.number ASC`
      )
      .all(ch.subject_id, ch.id);

    const siblings = db
      .prepare('SELECT id, order_index, slug, title FROM chapters WHERE subject_id = ? ORDER BY order_index ASC')
      .all(ch.subject_id);

    res.json({
      id: ch.id,
      subject_id: ch.subject_id,
      order_index: ch.order_index,
      slug: ch.slug,
      title: ch.title,
      subtitle: ch.subtitle,
      lecture_ref: ch.lecture_ref,
      estimated_minutes: ch.estimated_minutes,
      summary: ch.summary,
      exam_questions: examNums,
      sections: safeParseJson(ch.sections_json, []),
      key_takeaways: safeParseJson(ch.key_takeaways_json, []),
      figures: safeParseJson(ch.figures_json, []),
      progress: {
        completed: Boolean(ch.completed),
        read_percent: ch.read_percent,
        notes: ch.notes,
        last_visited_at: ch.last_visited_at,
      },
      linkedTopics,
      siblings,
    });
  });

  app.put('/api/chapters/:id/progress', (req, res) => {
    const ch = db.prepare('SELECT id, subject_id, title FROM chapters WHERE id = ?').get(req.params.id);
    if (!ch) return res.status(404).json({ error: 'Rozdział nie istnieje.' });

    const existing = db.prepare('SELECT * FROM chapter_progress WHERE chapter_id = ?').get(ch.id);
    const completed =
      req.body.completed !== undefined ? (req.body.completed ? 1 : 0) : (existing?.completed ?? 0);
    const readPercent =
      req.body.read_percent !== undefined
        ? Math.max(0, Math.min(100, Number(req.body.read_percent) || 0))
        : (existing?.read_percent ?? 0);
    const notes = req.body.notes !== undefined ? String(req.body.notes) : (existing?.notes ?? '');

    db.prepare(
      `INSERT INTO chapter_progress (chapter_id, completed, read_percent, notes, last_visited_at)
       VALUES (?, ?, ?, ?, datetime('now'))
       ON CONFLICT(chapter_id) DO UPDATE SET
         completed = excluded.completed,
         read_percent = excluded.read_percent,
         notes = excluded.notes,
         last_visited_at = datetime('now')`
    ).run(ch.id, completed, readPercent, notes);

    if (completed === 1 && (!existing || existing.completed === 0)) {
      logActivity(ch.subject_id, 'chapter_completed', `Ukończono: ${ch.title}`, 40);
    }

    res.json({ ok: true, completed: Boolean(completed), read_percent: readPercent, notes });
  });

  // --- Flashcards (SM-2) ---
  app.get('/api/subjects/:slug/flashcards', (req, res) => {
    const subject = db.prepare('SELECT id FROM subjects WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!subject) return res.status(404).json({ error: 'Przedmiot nie istnieje.' });

    const { chapter, dueOnly, tag, examNum } = req.query;
    let sql = `
      SELECT f.*, c.title AS chapter_title, c.order_index AS chapter_order,
             r.repetitions, r.interval_days, r.ease_factor, r.due_date,
             r.last_reviewed_at, r.last_rating, r.total_reviews, r.correct_reviews
      FROM flashcards f
      LEFT JOIN chapters c ON c.id = f.chapter_id
      LEFT JOIN flashcard_reviews r ON r.flashcard_id = f.id
      WHERE f.subject_id = ?
    `;
    const params = [subject.id];

    if (chapter && chapter !== 'all') {
      sql += ' AND f.chapter_id = ?';
      params.push(chapter);
    }
    if (examNum) {
      sql += ' AND f.exam_question_num = ?';
      params.push(Number(examNum));
    }

    sql += ' ORDER BY COALESCE(c.order_index, 99) ASC, f.id ASC';
    const nowIso = new Date().toISOString();

    let items = db
      .prepare(sql)
      .all(...params)
      .map((row) => {
        const isDue = !row.due_date || row.due_date <= nowIso;
        return {
          id: row.id,
          subject_id: row.subject_id,
          chapter_id: row.chapter_id,
          chapter_title: row.chapter_title || 'Własne',
          chapter_order: row.chapter_order || 99,
          front: row.front,
          back: row.back,
          hint: row.hint,
          tags: safeParseJson(row.tags_json, []),
          difficulty: row.difficulty,
          exam_question_num: row.exam_question_num,
          is_custom: Boolean(row.is_custom),
          review: {
            repetitions: row.repetitions ?? 0,
            interval_days: row.interval_days ?? 0,
            ease_factor: row.ease_factor ?? 2.5,
            due_date: row.due_date || null,
            last_reviewed_at: row.last_reviewed_at || null,
            last_rating: row.last_rating || null,
            total_reviews: row.total_reviews ?? 0,
            correct_reviews: row.correct_reviews ?? 0,
            is_due: isDue,
          },
        };
      });

    if (tag && tag !== 'all') {
      items = items.filter((f) => f.tags.includes(tag));
    }
    if (dueOnly === 'true' || dueOnly === '1') {
      items = items.filter((f) => f.review.is_due);
    }

    res.json({
      total: items.length,
      dueCount: items.filter((i) => i.review.is_due).length,
      items,
    });
  });

  app.post('/api/subjects/:slug/flashcards', (req, res) => {
    const subject = db.prepare('SELECT id FROM subjects WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!subject) return res.status(404).json({ error: 'Przedmiot nie istnieje.' });

    const front = String(req.body.front || '').trim();
    const back = String(req.body.back || '').trim();
    if (!front || !back) {
      return res.status(400).json({ error: 'Przód i tył fiszki są wymagane.' });
    }

    const id = `fc-custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const chapterId = req.body.chapter_id || null;
    const hint = String(req.body.hint || '').trim();
    const tags = Array.isArray(req.body.tags) ? req.body.tags : ['własne'];
    const difficulty = Math.max(1, Math.min(3, Number(req.body.difficulty) || 2));
    const examNum = req.body.exam_question_num ? Number(req.body.exam_question_num) : null;

    db.prepare(
      `INSERT INTO flashcards (id, subject_id, chapter_id, front, back, hint, tags_json, difficulty, exam_question_num, is_custom)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
    ).run(id, subject.id, chapterId, front, back, hint, JSON.stringify(tags), difficulty, examNum);

    logActivity(subject.id, 'flashcard_created', `Dodano własną fiszkę: ${front.slice(0, 60)}`, 15);
    res.status(201).json({ ok: true, id });
  });

  app.delete('/api/flashcards/:id', (req, res) => {
    const fc = db.prepare('SELECT id, is_custom FROM flashcards WHERE id = ?').get(req.params.id);
    if (!fc) return res.status(404).json({ error: 'Fiszka nie istnieje.' });
    if (!fc.is_custom) return res.status(403).json({ error: 'Można usuwać tylko własne fiszki.' });
    db.prepare('DELETE FROM flashcards WHERE id = ?').run(fc.id);
    res.json({ ok: true });
  });

  app.post('/api/flashcards/:id/review', (req, res) => {
    const fc = db.prepare('SELECT id, subject_id, front FROM flashcards WHERE id = ?').get(req.params.id);
    if (!fc) return res.status(404).json({ error: 'Fiszka nie istnieje.' });

    const rating = Number(req.body.rating);
    if (![1, 2, 3, 4].includes(rating)) {
      return res.status(400).json({ error: 'Ocena musi być liczbą 1–4.' });
    }

    const prev = db.prepare('SELECT * FROM flashcard_reviews WHERE flashcard_id = ?').get(fc.id);
    const next = computeSm2(prev, rating);
    const totalReviews = (prev?.total_reviews ?? 0) + 1;
    const correctReviews = (prev?.correct_reviews ?? 0) + next.is_correct;

    db.prepare(
      `INSERT INTO flashcard_reviews (
         flashcard_id, repetitions, interval_days, ease_factor, due_date,
         last_reviewed_at, last_rating, total_reviews, correct_reviews
       )
       VALUES (?, ?, ?, ?, ?, datetime('now'), ?, ?, ?)
       ON CONFLICT(flashcard_id) DO UPDATE SET
         repetitions = excluded.repetitions,
         interval_days = excluded.interval_days,
         ease_factor = excluded.ease_factor,
         due_date = excluded.due_date,
         last_reviewed_at = datetime('now'),
         last_rating = excluded.last_rating,
         total_reviews = excluded.total_reviews,
         correct_reviews = excluded.correct_reviews`
    ).run(
      fc.id,
      next.repetitions,
      next.interval_days,
      next.ease_factor,
      next.due_date,
      rating,
      totalReviews,
      correctReviews
    );

    const xp = rating >= 3 ? 8 : 3;
    logActivity(fc.subject_id, 'flashcard_review', `Powtórka fiszki (${rating}/4)`, xp);

    res.json({
      ok: true,
      review: {
        ...next,
        last_rating: rating,
        total_reviews: totalReviews,
        correct_reviews: correctReviews,
      },
    });
  });

  // --- Quizzes & Mock Tests ---
  app.get('/api/subjects/:slug/quizzes', (req, res) => {
    const subject = db.prepare('SELECT id FROM subjects WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!subject) return res.status(404).json({ error: 'Przedmiot nie istnieje.' });

    const { chapter, mode = 'chapter', limit } = req.query;
    let rows = db
      .prepare(
        `SELECT q.*, c.title AS chapter_title, c.order_index AS chapter_order
         FROM quiz_questions q
         LEFT JOIN chapters c ON c.id = q.chapter_id
         WHERE q.subject_id = ?`
      )
      .all(subject.id);

    if (chapter && chapter !== 'all') {
      rows = rows.filter((r) => r.chapter_id === chapter);
    }

    if (mode === 'weak') {
      const attempts = db
        .prepare('SELECT answers_json FROM exam_attempts WHERE subject_id = ? ORDER BY id DESC LIMIT 20')
        .all(subject.id);
      const wrongIds = new Set();
      for (const a of attempts) {
        const answers = safeParseJson(a.answers_json, []);
        for (const ans of answers) {
          if (!ans.is_correct && ans.question_id) wrongIds.add(ans.question_id);
        }
      }
      if (wrongIds.size > 0) {
        rows = rows.filter((r) => wrongIds.has(r.id));
      }
    }

    // Shuffle for tests / random modes
    if (mode === 'exam_sim' || mode === 'full_test' || mode === 'weak' || req.query.shuffle === 'true') {
      for (let i = rows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rows[i], rows[j]] = [rows[j], rows[i]];
      }
    } else {
      rows.sort((a, b) => (a.chapter_order - b.chapter_order) || a.id.localeCompare(b.id));
    }

    const lim = Number(limit);
    if (lim > 0 && lim < rows.length) {
      rows = rows.slice(0, lim);
    }

    const questions = rows.map((q) => ({
      id: q.id,
      chapter_id: q.chapter_id,
      chapter_title: q.chapter_title,
      question_type: q.question_type,
      question: q.question,
      options: safeParseJson(q.options_json, []),
      correct: safeParseJson(q.correct_json, []),
      explanation: q.explanation,
      difficulty: q.difficulty,
      exam_question_num: q.exam_question_num,
      figure_url: q.figure_url,
    }));

    res.json({ total: questions.length, questions });
  });

  app.post('/api/subjects/:slug/attempts', (req, res) => {
    const subject = db.prepare('SELECT id FROM subjects WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!subject) return res.status(404).json({ error: 'Przedmiot nie istnieje.' });

    const { mode = 'chapter_quiz', chapter_id = null, duration_sec = 0, responses = [] } = req.body;
    if (!Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ error: 'Brak odpowiedzi do sprawdzenia.' });
    }

    const getQ = db.prepare('SELECT * FROM quiz_questions WHERE id = ? AND subject_id = ?');
    let correctCount = 0;
    const detailed = [];

    for (const r of responses) {
      const q = getQ.get(r.question_id, subject.id);
      if (!q) continue;
      const correct = safeParseJson(q.correct_json, []).slice().sort((a, b) => a - b);
      const selected = (Array.isArray(r.selected) ? r.selected : [])
        .map(Number)
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) => a - b);
      const isCorrect =
        correct.length === selected.length && correct.every((val, idx) => val === selected[idx]);
      if (isCorrect) correctCount += 1;
      detailed.push({
        question_id: q.id,
        question: q.question,
        options: safeParseJson(q.options_json, []),
        selected,
        correct,
        is_correct: isCorrect,
        explanation: q.explanation,
        exam_question_num: q.exam_question_num,
      });
    }

    const total = detailed.length;
    const scorePercent = total ? Math.round((correctCount / total) * 1000) / 10 : 0;

    const info = db
      .prepare(
        `INSERT INTO exam_attempts (subject_id, mode, chapter_id, total_questions, correct_count, score_percent, duration_sec, answers_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        subject.id,
        mode,
        chapter_id,
        total,
        correctCount,
        scorePercent,
        Math.max(0, Number(duration_sec) || 0),
        JSON.stringify(detailed)
      );

    const xp = Math.max(10, Math.round(correctCount * 10 + (scorePercent >= 80 ? 25 : 0)));
    logActivity(
      subject.id,
      mode,
      `Test (${mode}): ${correctCount}/${total} (${scorePercent}%)`,
      xp
    );

    res.status(201).json({
      id: Number(info.lastInsertRowid),
      total_questions: total,
      correct_count: correctCount,
      score_percent: scorePercent,
      duration_sec,
      xp_earned: xp,
      results: detailed,
    });
  });

  app.get('/api/subjects/:slug/attempts', (req, res) => {
    const subject = db.prepare('SELECT id FROM subjects WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!subject) return res.status(404).json({ error: 'Przedmiot nie istnieje.' });

    const rows = db
      .prepare('SELECT * FROM exam_attempts WHERE subject_id = ? ORDER BY id DESC LIMIT 30')
      .all(subject.id)
      .map((a) => ({
        ...a,
        answers: safeParseJson(a.answers_json, []),
      }));
    res.json(rows);
  });

  // --- 60 Exam Topics ---
  app.get('/api/subjects/:slug/exam-topics', (req, res) => {
    const subject = db.prepare('SELECT id FROM subjects WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!subject) return res.status(404).json({ error: 'Przedmiot nie istnieje.' });

    const rows = db
      .prepare(
        `SELECT t.*, c.title AS chapter_title, c.order_index AS chapter_order,
                COALESCE(p.status, 'not_started') AS status,
                COALESCE(p.confidence, 0) AS confidence,
                COALESCE(p.student_note, '') AS student_note,
                p.updated_at
         FROM exam_topics t
         LEFT JOIN chapters c ON c.id = t.chapter_id
         LEFT JOIN exam_topic_progress p ON p.topic_id = t.id
         WHERE t.subject_id = ?
         ORDER BY t.number ASC`
      )
      .all(subject.id)
      .map((t) => ({
        id: t.id,
        subject_id: t.subject_id,
        number: t.number,
        chapter_id: t.chapter_id,
        chapter_title: t.chapter_title,
        chapter_order: t.chapter_order,
        category: t.category,
        question: t.question,
        short_answer: t.short_answer,
        full_answer: t.full_answer,
        key_points: safeParseJson(t.key_points_json, []),
        common_mistakes: t.common_mistakes,
        lab_connection: t.lab_connection,
        figure_refs: safeParseJson(t.figure_refs_json, []),
        svg_diagram_id: t.svg_diagram_id,
        progress: {
          status: t.status,
          confidence: t.confidence,
          student_note: t.student_note,
          updated_at: t.updated_at,
        },
      }));

    res.json({
      total: rows.length,
      mastered: rows.filter((r) => r.progress.status === 'mastered').length,
      learning: rows.filter((r) => r.progress.status === 'learning').length,
      items: rows,
    });
  });

  app.put('/api/exam-topics/:id/progress', (req, res) => {
    const topic = db.prepare('SELECT id, subject_id, number FROM exam_topics WHERE id = ?').get(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Zagadnienie nie istnieje.' });

    const existing = db.prepare('SELECT * FROM exam_topic_progress WHERE topic_id = ?').get(topic.id);
    const validStatuses = ['not_started', 'learning', 'mastered'];
    const status = validStatuses.includes(req.body.status) ? req.body.status : (existing?.status ?? 'not_started');
    const confidence =
      req.body.confidence !== undefined
        ? Math.max(0, Math.min(3, Number(req.body.confidence) || 0))
        : (existing?.confidence ?? 0);
    const studentNote =
      req.body.student_note !== undefined ? String(req.body.student_note) : (existing?.student_note ?? '');

    db.prepare(
      `INSERT INTO exam_topic_progress (topic_id, status, confidence, student_note, updated_at)
       VALUES (?, ?, ?, ?, datetime('now'))
       ON CONFLICT(topic_id) DO UPDATE SET
         status = excluded.status,
         confidence = excluded.confidence,
         student_note = excluded.student_note,
         updated_at = datetime('now')`
    ).run(topic.id, status, confidence, studentNote);

    if (status === 'mastered' && existing?.status !== 'mastered') {
      logActivity(topic.subject_id, 'topic_mastered', `Opanowano zagadnienie egzaminacyjne #${topic.number}`, 20);
    }

    res.json({ ok: true, status, confidence, student_note: studentNote });
  });

  // --- Glossary ---
  app.get('/api/subjects/:slug/glossary', (req, res) => {
    const subject = db.prepare('SELECT id FROM subjects WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!subject) return res.status(404).json({ error: 'Przedmiot nie istnieje.' });

    const rows = db
      .prepare(
        `SELECT g.*, c.title AS chapter_title
         FROM glossary_terms g
         LEFT JOIN chapters c ON c.id = g.chapter_id
         WHERE g.subject_id = ?
         ORDER BY g.is_required_exam DESC, g.term COLLATE NOCASE ASC`
      )
      .all(subject.id)
      .map((g) => ({ ...g, is_required_exam: Boolean(g.is_required_exam) }));

    res.json(rows);
  });

  // --- Global Search ---
  app.get('/api/search', (req, res) => {
    const q = String(req.query.q || '').trim().toLowerCase();
    if (q.length < 2) return res.json({ query: q, chapters: [], topics: [], glossary: [], flashcards: [] });

    const like = `%${q}%`;
    const chapters = db
      .prepare(
        `SELECT id, subject_id, order_index, title, subtitle, summary FROM chapters
         WHERE lower(title) LIKE ? OR lower(subtitle) LIKE ? OR lower(summary) LIKE ? OR lower(sections_json) LIKE ?
         LIMIT 10`
      )
      .all(like, like, like, like);

    const topics = db
      .prepare(
        `SELECT id, subject_id, number, category, question, short_answer FROM exam_topics
         WHERE lower(question) LIKE ? OR lower(short_answer) LIKE ? OR lower(full_answer) LIKE ?
         ORDER BY number ASC LIMIT 15`
      )
      .all(like, like, like);

    const glossary = db
      .prepare(
        `SELECT id, subject_id, term, full_name, definition, is_required_exam FROM glossary_terms
         WHERE lower(term) LIKE ? OR lower(full_name) LIKE ? OR lower(definition) LIKE ?
         LIMIT 12`
      )
      .all(like, like, like);

    const flashcards = db
      .prepare(
        `SELECT id, subject_id, chapter_id, front, back, exam_question_num FROM flashcards
         WHERE lower(front) LIKE ? OR lower(back) LIKE ?
         LIMIT 10`
      )
      .all(like, like);

    res.json({ query: q, chapters, topics, glossary, flashcards });
  });

  // --- IPv4 Subnet Trainer (Question #60!) ---
  app.get('/api/subnet/generate', (req, res) => {
    const difficulty = ['easy', 'medium', 'hard', 'exam'].includes(req.query.difficulty)
      ? req.query.difficulty
      : 'exam';
    const exercise = generateSubnetExercise(difficulty);
    res.json(exercise);
  });

  app.post('/api/subnet/analyze', (req, res) => {
    const { ip, mask } = req.body;
    const analysis = analyzeIpv4Subnet(ip, mask);
    if (!analysis) {
      return res.status(400).json({ error: 'Niepoprawny adres IPv4 lub maska podsieci (użyj np. 192.168.10.137 i /26 lub 255.255.255.192).' });
    }
    res.json(analysis);
  });

  app.post('/api/subnet/check', (req, res) => {
    const { ip, mask, difficulty = 'exam', time_sec = 0, answers = {} } = req.body;
    const solution = analyzeIpv4Subnet(ip, mask);
    if (!solution) {
      return res.status(400).json({ error: 'Niepoprawne dane zadania IPv4.' });
    }

    const normIp = (v) => String(v || '').trim();
    const checks = {
      network: normIp(answers.network) === solution.network,
      broadcast: normIp(answers.broadcast) === solution.broadcast,
      usableHosts: Number(String(answers.usableHosts || '').replace(/\s+/g, '')) === solution.usableHosts,
    };
    if (answers.firstHost !== undefined && String(answers.firstHost).trim() !== '') {
      checks.firstHost = normIp(answers.firstHost) === solution.firstHost;
    }
    if (answers.lastHost !== undefined && String(answers.lastHost).trim() !== '') {
      checks.lastHost = normIp(answers.lastHost) === solution.lastHost;
    }

    const allCorrect = Object.values(checks).every(Boolean);

    db.prepare(
      `INSERT INTO subnet_sessions (difficulty, ip_cidr, is_correct, time_sec, details_json)
       VALUES (?, ?, ?, ?, ?)`
    ).run(
      difficulty,
      solution.cidr,
      allCorrect ? 1 : 0,
      Math.max(0, Number(time_sec) || 0),
      JSON.stringify({ answers, checks })
    );

    logActivity(
      'sieci',
      'subnet_practice',
      `Trener IP (${solution.cidr}): ${allCorrect ? 'Poprawnie' : 'Do poprawy'}`,
      allCorrect ? 20 : 5
    );

    res.json({
      is_correct: allCorrect,
      checks,
      solution,
    });
  });

  app.get('/api/subnet/stats', (_req, res) => {
    const agg = db
      .prepare(
        `SELECT COUNT(*) AS total, COALESCE(SUM(is_correct), 0) AS correct,
                COALESCE(ROUND(AVG(time_sec), 1), 0) AS avg_time
         FROM subnet_sessions`
      )
      .get();
    const recent = db
      .prepare('SELECT id, difficulty, ip_cidr, is_correct, time_sec, created_at FROM subnet_sessions ORDER BY id DESC LIMIT 15')
      .all();

    let streak = 0;
    for (const r of recent) {
      if (r.is_correct) streak += 1;
      else break;
    }

    res.json({
      total: agg.total,
      correct: agg.correct,
      accuracy: agg.total ? Math.round((agg.correct / agg.total) * 100) : 0,
      avgTimeSec: agg.avg_time,
      streak,
      recent,
    });
  });

  // --- Backup Export ---
  app.get('/api/backup', (_req, res) => {
    res.json({
      exportedAt: new Date().toISOString(),
      chapterProgress: db.prepare('SELECT * FROM chapter_progress').all(),
      flashcardReviews: db.prepare('SELECT * FROM flashcard_reviews').all(),
      customFlashcards: db.prepare('SELECT * FROM flashcards WHERE is_custom = 1').all(),
      examAttempts: db.prepare('SELECT * FROM exam_attempts').all(),
      examTopicProgress: db.prepare('SELECT * FROM exam_topic_progress').all(),
      subnetSessions: db.prepare('SELECT * FROM subnet_sessions').all(),
    });
  });

  // Serve built frontend in production
  const distDir = path.join(ROOT_DIR, 'dist');
  const distAssetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(distDir)) {
    if (fs.existsSync(distAssetsDir)) {
      app.use('/assets', express.static(distAssetsDir, { maxAge: '30d', immutable: true }));
    }
    app.use(
      express.static(distDir, {
        setHeaders(res, filePath) {
          if (filePath.endsWith('index.html')) {
            res.setHeader('Cache-Control', 'no-cache');
          }
        },
      })
    );
    app.use((req, res, next) => {
      if (req.method === 'GET' && !req.path.startsWith('/api/') && !req.path.startsWith('/media/')) {
        res.setHeader('Cache-Control', 'no-cache');
        return res.sendFile(path.join(distDir, 'index.html'));
      }
      next();
    });
  }

  return { app, db };
}

// Start server directly when run as entry script
if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  const port = Number(process.env.PORT) || 3456;
  const host = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');
  const { app, db } = createApp();
  const server = app.listen(port, host, () => {
    console.log(`PUT Kompendium API + Web server running at http://${host}:${port}`);
  });

  let shuttingDown = false;
  const shutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`Received ${signal}, shutting down PUT Kompendium cleanly...`);
    server.close(() => {
      try {
        db.exec('PRAGMA wal_checkpoint(TRUNCATE);');
      } catch {
        // ignore if already checkpointed
      }
      try {
        db.close();
      } catch {
        // ignore if already closed
      }
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 5000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}
