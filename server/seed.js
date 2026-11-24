import { openDatabase } from './db.js';
import { SUBJECTS } from './content/subjects.js';
import { CHAPTERS_1_3 } from './content/sieci/chapters_1_3.js';
import { CHAPTERS_4_6 } from './content/sieci/chapters_4_6.js';
import { CHAPTERS_7_9 } from './content/sieci/chapters_7_9.js';
import { EXAM_TOPICS_1_30 } from './content/sieci/exam_topics_1_30.js';
import { EXAM_TOPICS_31_60 } from './content/sieci/exam_topics_31_60.js';
import { FLASHCARDS_SIECI } from './content/sieci/flashcards.js';
import { QUIZZES_SIECI } from './content/sieci/quizzes.js';
import { GLOSSARY_SIECI } from './content/sieci/glossary.js';

import { ANALIZA_CHAPTERS_1_3 } from './content/analiza/chapters_1_3.js';
import { ANALIZA_CHAPTERS_4_6 } from './content/analiza/chapters_4_6.js';
import { ANALIZA_CHAPTERS_7_9 } from './content/analiza/chapters_7_9.js';
import { EXAM_TOPICS_ANALIZA } from './content/analiza/exam_topics.js';
import { FLASHCARDS_ANALIZA } from './content/analiza/flashcards.js';
import { QUIZZES_ANALIZA } from './content/analiza/quizzes.js';
import { GLOSSARY_ANALIZA } from './content/analiza/glossary.js';

import { PROB_CHAPTERS_1_3 } from './content/probabilistyka/chapters_1_3.js';
import { PROB_CHAPTERS_4_6 } from './content/probabilistyka/chapters_4_6.js';
import { EXAM_TOPICS_PROBABILISTYKA } from './content/probabilistyka/exam_topics.js';
import { FLASHCARDS_PROBABILISTYKA } from './content/probabilistyka/flashcards.js';
import { QUIZZES_PROBABILISTYKA } from './content/probabilistyka/quizzes.js';
import { GLOSSARY_PROBABILISTYKA } from './content/probabilistyka/glossary.js';

import { ALGEBRA_CHAPTERS_1_3 } from './content/algebra/chapters_1_3.js';
import { ALGEBRA_CHAPTERS_4_6 } from './content/algebra/chapters_4_6.js';
import { ALGEBRA_EXAM_TOPICS } from './content/algebra/exam_topics.js';
import { ALGEBRA_FLASHCARDS } from './content/algebra/flashcards.js';
import { ALGEBRA_QUIZZES } from './content/algebra/quizzes.js';
import { ALGEBRA_GLOSSARY } from './content/algebra/glossary.js';

import { AISD_CHAPTERS_1_4 } from './content/aisd/chapters_1_4.js';
import { AISD_CHAPTERS_5_8 } from './content/aisd/chapters_5_8.js';
import { AISD_EXAM_TOPICS } from './content/aisd/exam_topics.js';
import { AISD_FLASHCARDS } from './content/aisd/flashcards.js';
import { AISD_QUIZZES } from './content/aisd/quizzes.js';
import { AISD_GLOSSARY } from './content/aisd/glossary.js';

import { FIZYKA_CHAPTERS } from './content/fizyka/chapters.js';
import { FIZYKA_EXAM_TOPICS } from './content/fizyka/exam_topics.js';
import { FIZYKA_FLASHCARDS } from './content/fizyka/flashcards.js';
import { FIZYKA_QUIZZES } from './content/fizyka/quizzes.js';
import { FIZYKA_GLOSSARY } from './content/fizyka/glossary.js';

export function seedDatabase(db) {
  const allChapters = [
    ...CHAPTERS_1_3,
    ...CHAPTERS_4_6,
    ...CHAPTERS_7_9,
    ...ANALIZA_CHAPTERS_1_3,
    ...ANALIZA_CHAPTERS_4_6,
    ...ANALIZA_CHAPTERS_7_9,
    ...PROB_CHAPTERS_1_3,
    ...PROB_CHAPTERS_4_6,
    ...ALGEBRA_CHAPTERS_1_3,
    ...ALGEBRA_CHAPTERS_4_6,
    ...AISD_CHAPTERS_1_4,
    ...AISD_CHAPTERS_5_8,
    ...FIZYKA_CHAPTERS,
  ];
  const allExamTopics = [
    ...EXAM_TOPICS_1_30,
    ...EXAM_TOPICS_31_60,
    ...EXAM_TOPICS_ANALIZA,
    ...EXAM_TOPICS_PROBABILISTYKA,
    ...ALGEBRA_EXAM_TOPICS,
    ...AISD_EXAM_TOPICS,
    ...FIZYKA_EXAM_TOPICS,
  ];
  const allFlashcards = [
    ...FLASHCARDS_SIECI.map((fc) => ({ ...fc, subject_id: fc.subject_id || 'sieci' })),
    ...FLASHCARDS_ANALIZA.map((fc) => ({ ...fc, subject_id: fc.subject_id || 'analiza' })),
    ...FLASHCARDS_PROBABILISTYKA.map((fc) => ({ ...fc, subject_id: fc.subject_id || 'probabilistyka' })),
    ...ALGEBRA_FLASHCARDS.map((fc) => ({ ...fc, subject_id: fc.subject_id || 'algebra' })),
    ...AISD_FLASHCARDS.map((fc) => ({ ...fc, subject_id: fc.subject_id || 'aisd' })),
    ...FIZYKA_FLASHCARDS.map((fc) => ({ ...fc, subject_id: fc.subject_id || 'fizyka' })),
  ];
  const allQuizzes = [
    ...QUIZZES_SIECI.map((q) => ({ ...q, subject_id: q.subject_id || 'sieci' })),
    ...QUIZZES_ANALIZA.map((q) => ({ ...q, subject_id: q.subject_id || 'analiza' })),
    ...QUIZZES_PROBABILISTYKA.map((q) => ({ ...q, subject_id: q.subject_id || 'probabilistyka' })),
    ...ALGEBRA_QUIZZES.map((q) => ({ ...q, subject_id: q.subject_id || 'algebra' })),
    ...AISD_QUIZZES.map((q) => ({ ...q, subject_id: q.subject_id || 'aisd' })),
    ...FIZYKA_QUIZZES.map((q) => ({ ...q, subject_id: q.subject_id || 'fizyka' })),
  ];
  const allGlossary = [
    ...GLOSSARY_SIECI.map((g) => ({ ...g, subject_id: g.subject_id || 'sieci' })),
    ...GLOSSARY_ANALIZA.map((g) => ({ ...g, subject_id: g.subject_id || 'analiza' })),
    ...GLOSSARY_PROBABILISTYKA.map((g) => ({ ...g, subject_id: g.subject_id || 'probabilistyka' })),
    ...ALGEBRA_GLOSSARY.map((g) => ({ ...g, subject_id: g.subject_id || 'algebra' })),
    ...AISD_GLOSSARY.map((g) => ({ ...g, subject_id: g.subject_id || 'aisd' })),
    ...FIZYKA_GLOSSARY.map((g) => ({ ...g, subject_id: g.subject_id || 'fizyka' })),
  ];

  db.exec('BEGIN TRANSACTION');
  try {
    const upsertSubject = db.prepare(`
      INSERT INTO subjects (id, slug, title, short_title, code, lecturer, description, icon, accent_color, status, source_dir, meta_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        short_title = excluded.short_title,
        code = excluded.code,
        lecturer = excluded.lecturer,
        description = excluded.description,
        icon = excluded.icon,
        accent_color = excluded.accent_color,
        status = excluded.status,
        source_dir = excluded.source_dir,
        meta_json = excluded.meta_json
    `);

    for (const s of SUBJECTS) {
      upsertSubject.run(
        s.id,
        s.slug,
        s.title,
        s.short_title,
        s.code,
        s.lecturer,
        s.description,
        s.icon,
        s.accent_color,
        s.status,
        s.source_dir || '',
        JSON.stringify(s.meta || {})
      );
    }

    const upsertChapter = db.prepare(`
      INSERT INTO chapters (
        id, subject_id, order_index, slug, title, subtitle, lecture_ref,
        estimated_minutes, summary, exam_questions_json, sections_json, key_takeaways_json, figures_json
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        subject_id = excluded.subject_id,
        order_index = excluded.order_index,
        slug = excluded.slug,
        title = excluded.title,
        subtitle = excluded.subtitle,
        lecture_ref = excluded.lecture_ref,
        estimated_minutes = excluded.estimated_minutes,
        summary = excluded.summary,
        exam_questions_json = excluded.exam_questions_json,
        sections_json = excluded.sections_json,
        key_takeaways_json = excluded.key_takeaways_json,
        figures_json = excluded.figures_json
    `);

    for (const ch of allChapters) {
      upsertChapter.run(
        ch.id,
        ch.subject_id,
        ch.order_index,
        ch.slug,
        ch.title,
        ch.subtitle,
        ch.lecture_ref,
        ch.estimated_minutes,
        ch.summary,
        JSON.stringify(ch.exam_questions || []),
        JSON.stringify(ch.sections || []),
        JSON.stringify(ch.key_takeaways || []),
        JSON.stringify(ch.figures || [])
      );
    }

    const upsertFlashcard = db.prepare(`
      INSERT INTO flashcards (
        id, subject_id, chapter_id, front, back, hint, tags_json, difficulty, exam_question_num, is_custom
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
      ON CONFLICT(id) DO UPDATE SET
        subject_id = excluded.subject_id,
        chapter_id = excluded.chapter_id,
        front = excluded.front,
        back = excluded.back,
        hint = excluded.hint,
        tags_json = excluded.tags_json,
        difficulty = excluded.difficulty,
        exam_question_num = excluded.exam_question_num
    `);

    for (const fc of allFlashcards) {
      upsertFlashcard.run(
        fc.id,
        fc.subject_id,
        fc.chapter_id,
        fc.front,
        fc.back,
        fc.hint || '',
        JSON.stringify(fc.tags || []),
        fc.difficulty || 2,
        fc.exam_question_num ?? null
      );
    }

    const upsertQuiz = db.prepare(`
      INSERT INTO quiz_questions (
        id, subject_id, chapter_id, question_type, question, options_json,
        correct_json, explanation, difficulty, exam_question_num, figure_url
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        subject_id = excluded.subject_id,
        chapter_id = excluded.chapter_id,
        question_type = excluded.question_type,
        question = excluded.question,
        options_json = excluded.options_json,
        correct_json = excluded.correct_json,
        explanation = excluded.explanation,
        difficulty = excluded.difficulty,
        exam_question_num = excluded.exam_question_num,
        figure_url = excluded.figure_url
    `);

    for (const q of allQuizzes) {
      upsertQuiz.run(
        q.id,
        q.subject_id,
        q.chapter_id,
        q.question_type,
        q.question,
        JSON.stringify(q.options),
        JSON.stringify(q.correct),
        q.explanation,
        q.difficulty || 2,
        q.exam_question_num ?? null,
        q.figure_url || null
      );
    }

    const upsertTopic = db.prepare(`
      INSERT INTO exam_topics (
        id, subject_id, number, chapter_id, category, question, short_answer,
        full_answer, key_points_json, common_mistakes, lab_connection, figure_refs_json, svg_diagram_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        subject_id = excluded.subject_id,
        number = excluded.number,
        chapter_id = excluded.chapter_id,
        category = excluded.category,
        question = excluded.question,
        short_answer = excluded.short_answer,
        full_answer = excluded.full_answer,
        key_points_json = excluded.key_points_json,
        common_mistakes = excluded.common_mistakes,
        lab_connection = excluded.lab_connection,
        figure_refs_json = excluded.figure_refs_json,
        svg_diagram_id = excluded.svg_diagram_id
    `);

    for (const t of allExamTopics) {
      upsertTopic.run(
        t.id,
        t.subject_id,
        t.number,
        t.chapter_id,
        t.category,
        t.question,
        t.short_answer,
        t.full_answer,
        JSON.stringify(t.key_points || []),
        t.common_mistakes || '',
        t.lab_connection || '',
        JSON.stringify(t.figure_refs || []),
        t.svg_diagram_id || null
      );
    }

    const upsertGlossary = db.prepare(`
      INSERT INTO glossary_terms (
        id, subject_id, chapter_id, term, full_name, category, is_required_exam, definition, example
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        subject_id = excluded.subject_id,
        chapter_id = excluded.chapter_id,
        term = excluded.term,
        full_name = excluded.full_name,
        category = excluded.category,
        is_required_exam = excluded.is_required_exam,
        definition = excluded.definition,
        example = excluded.example
    `);

    for (const g of allGlossary) {
      upsertGlossary.run(
        g.id,
        g.subject_id,
        g.chapter_id,
        g.term,
        g.full_name || '',
        g.category || 'Pojęcie',
        g.is_required_exam ? 1 : 0,
        g.definition,
        g.example || ''
      );
    }

    db.exec('COMMIT');
    return {
      subjects: SUBJECTS.length,
      chapters: allChapters.length,
      flashcards: allFlashcards.length,
      quizzes: allQuizzes.length,
      examTopics: allExamTopics.length,
      glossary: allGlossary.length,
    };
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

// Allow direct invocation: `node server/seed.js`
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  const db = openDatabase();
  const counts = seedDatabase(db);
  console.log('Seeded PUT StudyLab SQLite database successfully:', counts);
  db.close();
}
