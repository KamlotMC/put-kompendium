import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DEFAULT_DB_PATH = path.resolve(__dirname, '../data/study.db');

export function openDatabase(dbPath = process.env.STUDY_DB_PATH || process.env.DB_PATH || DEFAULT_DB_PATH) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA busy_timeout = 5000;');
  initSchema(db);
  return db;
}

export function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_title TEXT NOT NULL,
      code TEXT NOT NULL,
      lecturer TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      accent_color TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'ready',
      source_dir TEXT,
      meta_json TEXT NOT NULL DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      order_index INTEGER NOT NULL,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      lecture_ref TEXT NOT NULL,
      estimated_minutes INTEGER NOT NULL DEFAULT 20,
      summary TEXT NOT NULL,
      exam_questions_json TEXT NOT NULL DEFAULT '[]',
      sections_json TEXT NOT NULL DEFAULT '[]',
      key_takeaways_json TEXT NOT NULL DEFAULT '[]',
      figures_json TEXT NOT NULL DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS chapter_progress (
      chapter_id TEXT PRIMARY KEY REFERENCES chapters(id) ON DELETE CASCADE,
      completed INTEGER NOT NULL DEFAULT 0,
      read_percent INTEGER NOT NULL DEFAULT 0,
      notes TEXT NOT NULL DEFAULT '',
      last_visited_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS flashcards (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      chapter_id TEXT REFERENCES chapters(id) ON DELETE SET NULL,
      front TEXT NOT NULL,
      back TEXT NOT NULL,
      hint TEXT NOT NULL DEFAULT '',
      tags_json TEXT NOT NULL DEFAULT '[]',
      difficulty INTEGER NOT NULL DEFAULT 2,
      exam_question_num INTEGER,
      is_custom INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS flashcard_reviews (
      flashcard_id TEXT PRIMARY KEY REFERENCES flashcards(id) ON DELETE CASCADE,
      repetitions INTEGER NOT NULL DEFAULT 0,
      interval_days REAL NOT NULL DEFAULT 0,
      ease_factor REAL NOT NULL DEFAULT 2.5,
      due_date TEXT NOT NULL DEFAULT (datetime('now')),
      last_reviewed_at TEXT,
      last_rating INTEGER,
      total_reviews INTEGER NOT NULL DEFAULT 0,
      correct_reviews INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS quiz_questions (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      chapter_id TEXT REFERENCES chapters(id) ON DELETE SET NULL,
      question_type TEXT NOT NULL DEFAULT 'single',
      question TEXT NOT NULL,
      options_json TEXT NOT NULL DEFAULT '[]',
      correct_json TEXT NOT NULL DEFAULT '[]',
      explanation TEXT NOT NULL,
      difficulty INTEGER NOT NULL DEFAULT 2,
      exam_question_num INTEGER,
      figure_url TEXT
    );

    CREATE TABLE IF NOT EXISTS exam_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      mode TEXT NOT NULL,
      chapter_id TEXT,
      total_questions INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      score_percent REAL NOT NULL,
      duration_sec INTEGER NOT NULL DEFAULT 0,
      answers_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS exam_topics (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      number INTEGER NOT NULL,
      chapter_id TEXT REFERENCES chapters(id) ON DELETE SET NULL,
      category TEXT NOT NULL,
      question TEXT NOT NULL,
      short_answer TEXT NOT NULL,
      full_answer TEXT NOT NULL,
      key_points_json TEXT NOT NULL DEFAULT '[]',
      common_mistakes TEXT NOT NULL DEFAULT '',
      lab_connection TEXT NOT NULL DEFAULT '',
      figure_refs_json TEXT NOT NULL DEFAULT '[]',
      svg_diagram_id TEXT
    );

    CREATE TABLE IF NOT EXISTS exam_topic_progress (
      topic_id TEXT PRIMARY KEY REFERENCES exam_topics(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'not_started',
      confidence INTEGER NOT NULL DEFAULT 0,
      student_note TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS glossary_terms (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      chapter_id TEXT REFERENCES chapters(id) ON DELETE SET NULL,
      term TEXT NOT NULL,
      full_name TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'Pojęcie',
      is_required_exam INTEGER NOT NULL DEFAULT 0,
      definition TEXT NOT NULL,
      example TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS subnet_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      difficulty TEXT NOT NULL,
      ip_cidr TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      time_sec INTEGER NOT NULL DEFAULT 0,
      details_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS study_activity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id TEXT NOT NULL,
      activity_type TEXT NOT NULL,
      detail TEXT NOT NULL,
      xp_earned INTEGER NOT NULL DEFAULT 10,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_chapters_subject ON chapters(subject_id, order_index);
    CREATE INDEX IF NOT EXISTS idx_flashcards_subject ON flashcards(subject_id, chapter_id);
    CREATE INDEX IF NOT EXISTS idx_quiz_subject ON quiz_questions(subject_id, chapter_id);
    CREATE INDEX IF NOT EXISTS idx_exam_topics_subject ON exam_topics(subject_id, number);
    CREATE INDEX IF NOT EXISTS idx_glossary_subject ON glossary_terms(subject_id);
  `);
}

/**
 * SM-2 Spaced Repetition calculation.
 * rating: 1 = Powtórz (Again), 2 = Trudne (Hard), 3 = Dobrze (Good), 4 = Łatwe (Easy)
 */
export function computeSm2(prev, rating) {
  const qualityMap = { 1: 1, 2: 3, 3: 4, 4: 5 };
  const q = qualityMap[rating] ?? 4;

  let repetitions = prev?.repetitions ?? 0;
  let interval = prev?.interval_days ?? 0;
  let ef = prev?.ease_factor ?? 2.5;

  if (q < 3) {
    repetitions = 0;
    interval = 0.01; // ~15 minutes for immediate review in session
  } else {
    if (repetitions === 0) {
      interval = rating === 4 ? 3 : rating === 2 ? 0.5 : 1;
    } else if (repetitions === 1) {
      interval = rating === 4 ? 7 : rating === 2 ? 3 : 6;
    } else {
      const mult = rating === 4 ? ef * 1.25 : rating === 2 ? Math.max(1.2, ef * 0.85) : ef;
      interval = Math.round(interval * mult * 10) / 10;
    }
    repetitions += 1;
  }

  ef = Math.max(1.3, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  ef = Math.round(ef * 100) / 100;

  const dueMs = Date.now() + interval * 24 * 60 * 60 * 1000;
  const dueDate = new Date(dueMs).toISOString();

  return {
    repetitions,
    interval_days: interval,
    ease_factor: ef,
    due_date: dueDate,
    is_correct: rating >= 2 ? 1 : 0,
  };
}
