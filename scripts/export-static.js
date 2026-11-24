import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDatabase } from '../server/db.js';
import { seedDatabase } from '../server/seed.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const db = openDatabase(':memory:');
seedDatabase(db);

const all = (sql) => db.prepare(sql).all();
const subjects = all('SELECT * FROM subjects').map(({ source_dir: _s, ...rest }) => rest);
const content = {
  subjects,
  chapters: all('SELECT * FROM chapters ORDER BY subject_id, order_index'),
  exam_topics: all('SELECT * FROM exam_topics ORDER BY subject_id, number'),
  flashcards: all('SELECT * FROM flashcards ORDER BY id'),
  quiz_questions: all('SELECT * FROM quiz_questions ORDER BY id'),
  glossary_terms: all('SELECT * FROM glossary_terms'),
};

const outDir = path.join(root, 'public', 'data');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'content.json');
fs.writeFileSync(out, JSON.stringify(content));
console.log(
  'Static content exported:',
  Object.fromEntries(Object.entries(content).map(([k, v]) => [k, v.length])),
  `${(fs.statSync(out).size / 1024).toFixed(0)} KB`
);
db.close();
