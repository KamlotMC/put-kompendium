// Statyczna implementacja API (GitHub Pages): treść z content.json, postępy w localStorage.
import { analyzeIpv4Subnet, generateSubnetExercise } from '../../server/subnet.js';

const STORE_KEY = 'put-kompendium-progress-v1';
const BASE = import.meta.env.BASE_URL || '/';

let contentPromise = null;
function loadContent() {
  if (!contentPromise) {
    contentPromise = fetch(`${BASE}data/content.json`)
      .then((r) => r.text())
      .then((txt) => JSON.parse(txt.replaceAll('"/media/', `"${BASE}media/`)));
  }
  return contentPromise;
}

const parse = (s, fb) => {
  try {
    return JSON.parse(s);
  } catch {
    return fb;
  }
};

function emptyStore() {
  return { chapters: {}, topics: {}, reviews: {}, custom: [], attempts: [], activity: [], subnet: [], seq: 0 };
}
function readStore() {
  return { ...emptyStore(), ...parse(localStorage.getItem(STORE_KEY) || '{}', {}) };
}
function writeStore(s) {
  localStorage.setItem(STORE_KEY, JSON.stringify(s));
}
const nowSql = () => new Date().toISOString().replace('T', ' ').slice(0, 19);

function logActivity(store, subject_id, activity_type, detail, xp = 10) {
  store.seq += 1;
  store.activity.push({ id: store.seq, subject_id, activity_type, detail, xp_earned: xp, created_at: nowSql() });
}

function computeSm2(prev, rating) {
  const q = { 1: 1, 2: 3, 3: 4, 4: 5 }[rating] ?? 4;
  let repetitions = prev?.repetitions ?? 0;
  let interval = prev?.interval_days ?? 0;
  let ef = prev?.ease_factor ?? 2.5;
  if (q < 3) {
    repetitions = 0;
    interval = 0.01;
  } else {
    if (repetitions === 0) interval = rating === 4 ? 3 : rating === 2 ? 0.5 : 1;
    else if (repetitions === 1) interval = rating === 4 ? 7 : rating === 2 ? 3 : 6;
    else {
      const mult = rating === 4 ? ef * 1.25 : rating === 2 ? Math.max(1.2, ef * 0.85) : ef;
      interval = Math.round(interval * mult * 10) / 10;
    }
    repetitions += 1;
  }
  ef = Math.max(1.3, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  ef = Math.round(ef * 100) / 100;
  return {
    repetitions,
    interval_days: interval,
    ease_factor: ef,
    due_date: new Date(Date.now() + interval * 86400000).toISOString(),
    is_correct: rating >= 2 ? 1 : 0,
  };
}

function findSubject(c, slug) {
  const s = c.subjects.find((x) => x.slug === slug || x.id === slug);
  if (!s) throw new Error('Przedmiot nie został znaleziony.');
  return s;
}

function allFlashcards(c, store) {
  return [...c.flashcards, ...store.custom];
}

function subjectWithStats(c, store, row) {
  const sid = row.id;
  const chapters = c.chapters.filter((x) => x.subject_id === sid);
  const chaptersDone = chapters.filter((x) => store.chapters[x.id]?.completed).length;
  const cards = allFlashcards(c, store).filter((f) => f.subject_id === sid);
  const nowIso = new Date().toISOString();
  const flashcardsDue = cards.filter((f) => {
    const r = store.reviews[f.id];
    return !r || r.due_date <= nowIso;
  }).length;
  const flashcardsMastered = cards.filter((f) => (store.reviews[f.id]?.repetitions ?? 0) >= 2).length;
  const quizzesTotal = c.quiz_questions.filter((q) => q.subject_id === sid).length;
  const att = store.attempts.filter((a) => a.subject_id === sid);
  const avg = att.length ? Math.round((att.reduce((s, a) => s + a.score_percent, 0) / att.length) * 10) / 10 : 0;
  const best = att.length ? Math.max(...att.map((a) => a.score_percent)) : 0;
  const topics = c.exam_topics.filter((t) => t.subject_id === sid);
  const topicsMastered = topics.filter((t) => store.topics[t.id]?.status === 'mastered').length;
  const topicsLearning = topics.filter((t) => store.topics[t.id]?.status === 'learning').length;
  const glossaryTotal = c.glossary_terms.filter((g) => g.subject_id === sid).length;
  let readiness = 0;
  if (row.status === 'ready') {
    const chPct = chapters.length ? (chaptersDone / chapters.length) * 100 : 0;
    const topPct = topics.length ? ((topicsMastered + topicsLearning * 0.4) / topics.length) * 100 : 0;
    const fcPct = cards.length ? (flashcardsMastered / cards.length) * 100 : 0;
    readiness = Math.round(chPct * 0.25 + topPct * 0.35 + fcPct * 0.2 + (att.length ? avg : 0) * 0.2);
  }
  return {
    ...row,
    meta: parse(row.meta_json, {}),
    stats: {
      chaptersTotal: chapters.length,
      chaptersDone,
      flashcardsTotal: cards.length,
      flashcardsDue,
      flashcardsMastered,
      quizzesTotal,
      attemptsCount: att.length,
      avgScore: avg,
      bestScore: best,
      topicsTotal: topics.length,
      topicsMastered,
      topicsLearning,
      glossaryTotal,
      readiness,
    },
  };
}

const sortReady = (rows) => rows.slice().sort((a, b) => (a.status === 'ready' ? -1 : 1) - (b.status === 'ready' ? -1 : 1));

export const api = {
  async getOverview() {
    const c = await loadContent();
    const store = readStore();
    const subjects = sortReady(c.subjects).map((s) => subjectWithStats(c, store, s));
    const sub = store.subnet;
    const days = new Set(store.activity.map((a) => a.created_at.slice(0, 10))).size;
    return {
      subjects,
      summary: {
        totalXp: store.activity.reduce((s, a) => s + a.xp_earned, 0),
        activeDays: days,
        subnetTotal: sub.length,
        subnetCorrect: sub.filter((x) => x.is_correct).length,
        subnetAccuracy: sub.length ? Math.round((sub.filter((x) => x.is_correct).length / sub.length) * 100) : 0,
      },
      recentActivity: store.activity.slice(-12).reverse(),
    };
  },

  async getSubjects() {
    const c = await loadContent();
    const store = readStore();
    return sortReady(c.subjects).map((s) => subjectWithStats(c, store, s));
  },

  async getSubject(slug) {
    const c = await loadContent();
    const store = readStore();
    const subject = findSubject(c, slug);
    const chapters = c.chapters
      .filter((x) => x.subject_id === subject.id)
      .map((ch) => {
        const p = store.chapters[ch.id] || {};
        return {
          id: ch.id,
          order_index: ch.order_index,
          slug: ch.slug,
          title: ch.title,
          subtitle: ch.subtitle,
          lecture_ref: ch.lecture_ref,
          estimated_minutes: ch.estimated_minutes,
          summary: ch.summary,
          exam_questions_json: ch.exam_questions_json,
          figures_json: ch.figures_json,
          completed: Boolean(p.completed),
          read_percent: p.read_percent || 0,
          notes: p.notes || '',
          last_visited_at: p.last_visited_at || null,
          exam_questions: parse(ch.exam_questions_json, []),
          figures_count: parse(ch.figures_json, []).length,
          flashcards_count: allFlashcards(c, store).filter((f) => f.chapter_id === ch.id).length,
          quizzes_count: c.quiz_questions.filter((q) => q.chapter_id === ch.id).length,
        };
      });
    const recentAttempts = store.attempts
      .filter((a) => a.subject_id === subject.id)
      .slice(-8)
      .reverse();
    return { ...subjectWithStats(c, store, subject), chapters, recentAttempts };
  },

  async getChapter(id) {
    const c = await loadContent();
    const store = readStore();
    const ch = c.chapters.find((x) => x.id === id || x.slug === id);
    if (!ch) throw new Error('Rozdział nie istnieje.');
    const p = store.chapters[ch.id] || {};
    const linkedTopics = c.exam_topics
      .filter((t) => t.subject_id === ch.subject_id && t.chapter_id === ch.id)
      .map((t) => ({
        id: t.id,
        number: t.number,
        question: t.question,
        short_answer: t.short_answer,
        status: store.topics[t.id]?.status || 'not_started',
      }));
    return {
      id: ch.id,
      subject_id: ch.subject_id,
      order_index: ch.order_index,
      slug: ch.slug,
      title: ch.title,
      subtitle: ch.subtitle,
      lecture_ref: ch.lecture_ref,
      estimated_minutes: ch.estimated_minutes,
      summary: ch.summary,
      exam_questions: parse(ch.exam_questions_json, []),
      sections: parse(ch.sections_json, []),
      key_takeaways: parse(ch.key_takeaways_json, []),
      figures: parse(ch.figures_json, []),
      progress: {
        completed: Boolean(p.completed),
        read_percent: p.read_percent || 0,
        notes: p.notes || '',
        last_visited_at: p.last_visited_at || null,
      },
      linkedTopics,
      siblings: c.chapters
        .filter((x) => x.subject_id === ch.subject_id)
        .map((x) => ({ id: x.id, order_index: x.order_index, slug: x.slug, title: x.title })),
    };
  },

  async updateChapterProgress(id, body) {
    const c = await loadContent();
    const ch = c.chapters.find((x) => x.id === id);
    if (!ch) throw new Error('Rozdział nie istnieje.');
    const store = readStore();
    const ex = store.chapters[id];
    const completed = body.completed !== undefined ? Boolean(body.completed) : Boolean(ex?.completed);
    const read_percent =
      body.read_percent !== undefined ? Math.max(0, Math.min(100, Number(body.read_percent) || 0)) : ex?.read_percent ?? 0;
    const notes = body.notes !== undefined ? String(body.notes) : ex?.notes ?? '';
    store.chapters[id] = { completed, read_percent, notes, last_visited_at: nowSql() };
    if (completed && !ex?.completed) logActivity(store, ch.subject_id, 'chapter_completed', `Ukończono: ${ch.title}`, 40);
    writeStore(store);
    return { ok: true, completed, read_percent, notes };
  },

  async getFlashcards(slug, params = {}) {
    const c = await loadContent();
    const store = readStore();
    const subject = findSubject(c, slug);
    const nowIso = new Date().toISOString();
    const chOrder = Object.fromEntries(c.chapters.map((x) => [x.id, x]));
    let items = allFlashcards(c, store)
      .filter((f) => f.subject_id === subject.id)
      .filter((f) => !params.chapter || params.chapter === 'all' || f.chapter_id === params.chapter)
      .filter((f) => !params.examNum || f.exam_question_num === Number(params.examNum))
      .sort(
        (a, b) =>
          (chOrder[a.chapter_id]?.order_index ?? 99) - (chOrder[b.chapter_id]?.order_index ?? 99) ||
          a.id.localeCompare(b.id)
      )
      .map((f) => {
        const r = store.reviews[f.id];
        const ch = chOrder[f.chapter_id];
        return {
          id: f.id,
          subject_id: f.subject_id,
          chapter_id: f.chapter_id,
          chapter_title: ch?.title || 'Własne',
          chapter_order: ch?.order_index || 99,
          front: f.front,
          back: f.back,
          hint: f.hint,
          tags: parse(f.tags_json, []),
          difficulty: f.difficulty,
          exam_question_num: f.exam_question_num,
          is_custom: Boolean(f.is_custom),
          review: {
            repetitions: r?.repetitions ?? 0,
            interval_days: r?.interval_days ?? 0,
            ease_factor: r?.ease_factor ?? 2.5,
            due_date: r?.due_date || null,
            last_reviewed_at: r?.last_reviewed_at || null,
            last_rating: r?.last_rating || null,
            total_reviews: r?.total_reviews ?? 0,
            correct_reviews: r?.correct_reviews ?? 0,
            is_due: !r || r.due_date <= nowIso,
          },
        };
      });
    if (params.tag && params.tag !== 'all') items = items.filter((f) => f.tags.includes(params.tag));
    if (params.dueOnly === 'true' || params.dueOnly === '1') items = items.filter((f) => f.review.is_due);
    return { total: items.length, dueCount: items.filter((i) => i.review.is_due).length, items };
  },

  async createFlashcard(slug, body) {
    const c = await loadContent();
    const subject = findSubject(c, slug);
    const front = String(body.front || '').trim();
    const back = String(body.back || '').trim();
    if (!front || !back) throw new Error('Przód i tył fiszki są wymagane.');
    const store = readStore();
    const id = `fc-custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    store.custom.push({
      id,
      subject_id: subject.id,
      chapter_id: body.chapter_id || null,
      front,
      back,
      hint: String(body.hint || '').trim(),
      tags_json: JSON.stringify(Array.isArray(body.tags) ? body.tags : ['własne']),
      difficulty: Math.max(1, Math.min(3, Number(body.difficulty) || 2)),
      exam_question_num: body.exam_question_num ? Number(body.exam_question_num) : null,
      is_custom: 1,
    });
    logActivity(store, subject.id, 'flashcard_created', `Dodano własną fiszkę: ${front.slice(0, 60)}`, 15);
    writeStore(store);
    return { ok: true, id };
  },

  async deleteFlashcard(id) {
    const store = readStore();
    if (!store.custom.some((f) => f.id === id)) throw new Error('Można usuwać tylko własne fiszki.');
    store.custom = store.custom.filter((f) => f.id !== id);
    delete store.reviews[id];
    writeStore(store);
    return { ok: true };
  },

  async reviewFlashcard(id, rating) {
    const c = await loadContent();
    const store = readStore();
    const fc = allFlashcards(c, store).find((f) => f.id === id);
    if (!fc) throw new Error('Fiszka nie istnieje.');
    if (![1, 2, 3, 4].includes(Number(rating))) throw new Error('Ocena musi być liczbą 1–4.');
    const prev = store.reviews[id];
    const next = computeSm2(prev, Number(rating));
    const total = (prev?.total_reviews ?? 0) + 1;
    const correct = (prev?.correct_reviews ?? 0) + next.is_correct;
    store.reviews[id] = {
      repetitions: next.repetitions,
      interval_days: next.interval_days,
      ease_factor: next.ease_factor,
      due_date: next.due_date,
      last_reviewed_at: nowSql(),
      last_rating: Number(rating),
      total_reviews: total,
      correct_reviews: correct,
    };
    logActivity(store, fc.subject_id, 'flashcard_review', `Powtórka fiszki (${rating}/4)`, rating >= 3 ? 8 : 3);
    writeStore(store);
    return { ok: true, review: { ...next, last_rating: Number(rating), total_reviews: total, correct_reviews: correct } };
  },

  async getQuizzes(slug, params = {}) {
    const c = await loadContent();
    const store = readStore();
    const subject = findSubject(c, slug);
    const chOrder = Object.fromEntries(c.chapters.map((x) => [x.id, x]));
    let rows = c.quiz_questions.filter((q) => q.subject_id === subject.id);
    if (params.chapter && params.chapter !== 'all') rows = rows.filter((r) => r.chapter_id === params.chapter);
    const mode = params.mode || 'chapter';
    if (mode === 'weak') {
      const wrong = new Set();
      store.attempts
        .filter((a) => a.subject_id === subject.id)
        .slice(-20)
        .forEach((a) => a.answers.forEach((x) => !x.is_correct && x.question_id && wrong.add(x.question_id)));
      if (wrong.size) rows = rows.filter((r) => wrong.has(r.id));
    }
    rows = rows.slice();
    if (['exam_sim', 'full_test', 'weak'].includes(mode) || params.shuffle === 'true') {
      for (let i = rows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rows[i], rows[j]] = [rows[j], rows[i]];
      }
    }
    const lim = Number(params.limit);
    if (lim > 0 && lim < rows.length) rows = rows.slice(0, lim);
    const questions = rows.map((q) => ({
      id: q.id,
      chapter_id: q.chapter_id,
      chapter_title: chOrder[q.chapter_id]?.title,
      question_type: q.question_type,
      question: q.question,
      options: parse(q.options_json, []),
      correct: parse(q.correct_json, []),
      explanation: q.explanation,
      difficulty: q.difficulty,
      exam_question_num: q.exam_question_num,
      figure_url: q.figure_url,
    }));
    return { total: questions.length, questions };
  },

  async submitAttempt(slug, body) {
    const c = await loadContent();
    const store = readStore();
    const subject = findSubject(c, slug);
    const { mode = 'chapter_quiz', chapter_id = null, duration_sec = 0, responses = [] } = body;
    if (!responses.length) throw new Error('Brak odpowiedzi do sprawdzenia.');
    let correctCount = 0;
    const detailed = [];
    for (const r of responses) {
      const q = c.quiz_questions.find((x) => x.id === r.question_id && x.subject_id === subject.id);
      if (!q) continue;
      const correct = parse(q.correct_json, []).slice().sort((a, b) => a - b);
      const selected = (r.selected || []).map(Number).filter((n) => !Number.isNaN(n)).sort((a, b) => a - b);
      const ok = correct.length === selected.length && correct.every((v, i) => v === selected[i]);
      if (ok) correctCount += 1;
      detailed.push({
        question_id: q.id,
        question: q.question,
        options: parse(q.options_json, []),
        selected,
        correct,
        is_correct: ok,
        explanation: q.explanation,
        exam_question_num: q.exam_question_num,
      });
    }
    const total = detailed.length;
    const score = total ? Math.round((correctCount / total) * 1000) / 10 : 0;
    store.seq += 1;
    const id = store.seq;
    store.attempts.push({
      id,
      subject_id: subject.id,
      mode,
      chapter_id,
      total_questions: total,
      correct_count: correctCount,
      score_percent: score,
      duration_sec: Math.max(0, Number(duration_sec) || 0),
      answers: detailed,
      created_at: nowSql(),
    });
    const xp = Math.max(10, Math.round(correctCount * 10 + (score >= 80 ? 25 : 0)));
    logActivity(store, subject.id, mode, `Test (${mode}): ${correctCount}/${total} (${score}%)`, xp);
    writeStore(store);
    return {
      id,
      total_questions: total,
      correct_count: correctCount,
      score_percent: score,
      duration_sec,
      xp_earned: xp,
      results: detailed,
    };
  },

  async getAttempts(slug) {
    const c = await loadContent();
    const subject = findSubject(c, slug);
    return readStore()
      .attempts.filter((a) => a.subject_id === subject.id)
      .slice(-30)
      .reverse();
  },

  async getExamTopics(slug) {
    const c = await loadContent();
    const store = readStore();
    const subject = findSubject(c, slug);
    const chOrder = Object.fromEntries(c.chapters.map((x) => [x.id, x]));
    const rows = c.exam_topics
      .filter((t) => t.subject_id === subject.id)
      .map((t) => {
        const p = store.topics[t.id] || {};
        return {
          id: t.id,
          subject_id: t.subject_id,
          number: t.number,
          chapter_id: t.chapter_id,
          chapter_title: chOrder[t.chapter_id]?.title,
          chapter_order: chOrder[t.chapter_id]?.order_index,
          category: t.category,
          question: t.question,
          short_answer: t.short_answer,
          full_answer: t.full_answer,
          key_points: parse(t.key_points_json, []),
          common_mistakes: t.common_mistakes,
          lab_connection: t.lab_connection,
          figure_refs: parse(t.figure_refs_json, []),
          svg_diagram_id: t.svg_diagram_id,
          progress: {
            status: p.status || 'not_started',
            confidence: p.confidence || 0,
            student_note: p.student_note || '',
            updated_at: p.updated_at || null,
          },
        };
      });
    return {
      total: rows.length,
      mastered: rows.filter((r) => r.progress.status === 'mastered').length,
      learning: rows.filter((r) => r.progress.status === 'learning').length,
      items: rows,
    };
  },

  async updateExamTopicProgress(id, body) {
    const c = await loadContent();
    const topic = c.exam_topics.find((t) => t.id === id);
    if (!topic) throw new Error('Zagadnienie nie istnieje.');
    const store = readStore();
    const ex = store.topics[id];
    const status = ['not_started', 'learning', 'mastered'].includes(body.status) ? body.status : ex?.status ?? 'not_started';
    const confidence =
      body.confidence !== undefined ? Math.max(0, Math.min(3, Number(body.confidence) || 0)) : ex?.confidence ?? 0;
    const student_note = body.student_note !== undefined ? String(body.student_note) : ex?.student_note ?? '';
    store.topics[id] = { status, confidence, student_note, updated_at: nowSql() };
    if (status === 'mastered' && ex?.status !== 'mastered')
      logActivity(store, topic.subject_id, 'topic_mastered', `Opanowano zagadnienie egzaminacyjne #${topic.number}`, 20);
    writeStore(store);
    return { ok: true, status, confidence, student_note };
  },

  async getGlossary(slug) {
    const c = await loadContent();
    const subject = findSubject(c, slug);
    const chOrder = Object.fromEntries(c.chapters.map((x) => [x.id, x]));
    return c.glossary_terms
      .filter((g) => g.subject_id === subject.id)
      .map((g) => ({ ...g, chapter_title: chOrder[g.chapter_id]?.title, is_required_exam: Boolean(g.is_required_exam) }))
      .sort((a, b) => b.is_required_exam - a.is_required_exam || a.term.localeCompare(b.term, 'pl', { sensitivity: 'base' }));
  },

  async search(q) {
    const c = await loadContent();
    const s = String(q || '').trim().toLowerCase();
    if (s.length < 2) return { query: s, chapters: [], topics: [], glossary: [], flashcards: [] };
    const has = (...f) => f.some((x) => String(x || '').toLowerCase().includes(s));
    return {
      query: s,
      chapters: c.chapters
        .filter((x) => has(x.title, x.subtitle, x.summary, x.sections_json))
        .slice(0, 10)
        .map((x) => ({ id: x.id, subject_id: x.subject_id, order_index: x.order_index, title: x.title, subtitle: x.subtitle, summary: x.summary })),
      topics: c.exam_topics
        .filter((x) => has(x.question, x.short_answer, x.full_answer))
        .slice(0, 15)
        .map((x) => ({ id: x.id, subject_id: x.subject_id, number: x.number, category: x.category, question: x.question, short_answer: x.short_answer })),
      glossary: c.glossary_terms
        .filter((x) => has(x.term, x.full_name, x.definition))
        .slice(0, 12)
        .map((x) => ({ id: x.id, subject_id: x.subject_id, term: x.term, full_name: x.full_name, definition: x.definition, is_required_exam: x.is_required_exam })),
      flashcards: c.flashcards
        .filter((x) => has(x.front, x.back))
        .slice(0, 10)
        .map((x) => ({ id: x.id, subject_id: x.subject_id, chapter_id: x.chapter_id, front: x.front, back: x.back, exam_question_num: x.exam_question_num })),
    };
  },

  async generateSubnet(difficulty = 'exam') {
    return generateSubnetExercise(['easy', 'medium', 'hard', 'exam'].includes(difficulty) ? difficulty : 'exam');
  },

  async checkSubnet(body) {
    const { ip, mask, difficulty = 'exam', time_sec = 0, answers = {} } = body;
    const solution = analyzeIpv4Subnet(ip, mask);
    if (!solution) throw new Error('Niepoprawne dane zadania IPv4.');
    const n = (v) => String(v || '').trim();
    const checks = {
      network: n(answers.network) === solution.network,
      broadcast: n(answers.broadcast) === solution.broadcast,
      usableHosts: Number(String(answers.usableHosts || '').replace(/\s+/g, '')) === solution.usableHosts,
    };
    if (n(answers.firstHost)) checks.firstHost = n(answers.firstHost) === solution.firstHost;
    if (n(answers.lastHost)) checks.lastHost = n(answers.lastHost) === solution.lastHost;
    const ok = Object.values(checks).every(Boolean);
    const store = readStore();
    store.seq += 1;
    store.subnet.push({
      id: store.seq,
      difficulty,
      ip_cidr: solution.cidr,
      is_correct: ok ? 1 : 0,
      time_sec: Math.max(0, Number(time_sec) || 0),
      created_at: nowSql(),
    });
    logActivity(store, 'sieci', 'subnet_practice', `Trener IP (${solution.cidr}): ${ok ? 'Poprawnie' : 'Do poprawy'}`, ok ? 20 : 5);
    writeStore(store);
    return { is_correct: ok, checks, solution };
  },

  async analyzeSubnet(ip, mask) {
    const a = analyzeIpv4Subnet(ip, mask);
    if (!a) throw new Error('Niepoprawny adres IPv4 lub maska podsieci (użyj np. 192.168.10.137 i /26 lub 255.255.255.192).');
    return a;
  },

  async getSubnetStats() {
    const rows = readStore().subnet;
    const recent = rows.slice(-15).reverse();
    let streak = 0;
    for (const r of recent) {
      if (r.is_correct) streak += 1;
      else break;
    }
    const correct = rows.filter((r) => r.is_correct).length;
    return {
      total: rows.length,
      correct,
      accuracy: rows.length ? Math.round((correct / rows.length) * 100) : 0,
      avgTimeSec: rows.length ? Math.round((rows.reduce((s, r) => s + r.time_sec, 0) / rows.length) * 10) / 10 : 0,
      streak,
      recent,
    };
  },

  async getBackup() {
    return { exportedAt: new Date().toISOString(), storage: 'localStorage', ...readStore() };
  },
};
