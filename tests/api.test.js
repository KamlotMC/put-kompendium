import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApp } from '../server/index.js';
import { analyzeIpv4Subnet } from '../server/subnet.js';

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'put-studylab-test-'));
const testDbPath = path.join(tmpDir, 'test.db');

let server;
let baseUrl;
let dbRef;

test.before(async () => {
  const { app, db } = createApp(testDbPath);
  dbRef = db;
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      baseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  if (dbRef) dbRef.close();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

async function apiJson(route, opts = {}) {
  const res = await fetch(`${baseUrl}${route}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  return { status: res.status, data: await res.json() };
}

test('health endpoint reports complete seeded content counts for all 6 subjects (Sieci, Analiza, Probabilistyka, Algebra, AiSD, Fizyka)', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(res.headers.get('x-frame-options'), 'SAMEORIGIN');
  assert.equal(res.headers.get('x-powered-by'), null);

  const data = await res.json();
  assert.equal(data.ok, true);
  assert.equal(data.counts.subjects, 6);
  assert.equal(data.counts.chapters, 43); // 9 sieci + 9 analiza + 6 probabilistyka + 6 algebra + 8 aisd + 5 fizyka
  assert.equal(data.counts.topics, 187); // 60 + 30 + 25 + 24 + 28 + 20
  assert.ok(data.counts.flashcards >= 330); // 76 + 66 + 48 + 48 + 56 + 40 = 334
  assert.ok(data.counts.quizzes >= 290); // 70 + 52 + 44 + 44 + 48 + 36 = 294
});

test('all 60 Sieci exam topics are numbered 1..60 with commentary and valid media paths', async () => {
  const { status, data } = await apiJson('/api/subjects/sieci/exam-topics');
  assert.equal(status, 200);
  assert.equal(data.total, 60);
  const nums = data.items.map((t) => t.number);
  for (let i = 1; i <= 60; i++) {
    assert.equal(nums[i - 1], i, `Missing sieci exam topic #${i}`);
  }
  const publicDir = path.resolve(process.cwd(), 'public');
  for (const t of data.items) {
    assert.ok(t.full_answer.length > 150, `Sieci topic #${t.number} commentary too short`);
    assert.ok(t.key_points.length >= 3, `Sieci topic #${t.number} needs >=3 key points`);
    for (const ref of t.figure_refs) {
      assert.ok(fs.existsSync(path.join(publicDir, ref)), `Missing figure file: ${ref}`);
    }
  }
});

test('all 30 Analiza exam topics and 9 chapters are complete and every referenced SVG diagram exists', async () => {
  const mathDiagramsSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/MathDiagrams.jsx'),
    'utf8'
  );

  const { status, data } = await apiJson('/api/subjects/analiza/exam-topics');
  assert.equal(status, 200);
  assert.equal(data.total, 30);
  for (let i = 1; i <= 30; i++) {
    assert.equal(data.items[i - 1].number, i, `Missing analiza exam topic #${i}`);
    assert.ok(data.items[i - 1].full_answer.length > 150, `Analiza topic #${i} too short`);
    if (data.items[i - 1].svg_diagram_id) {
      assert.ok(
        mathDiagramsSrc.includes(`'${data.items[i - 1].svg_diagram_id}'`),
        `Unregistered math SVG diagramId on topic #${i}: ${data.items[i - 1].svg_diagram_id}`
      );
    }
  }

  const subj = await apiJson('/api/subjects/analiza');
  assert.equal(subj.status, 200);
  assert.equal(subj.data.status, 'ready');
  assert.equal(subj.data.chapters.length, 9);

  let totalSvgBlocks = 0;
  for (const chSummary of subj.data.chapters) {
    const ch = await apiJson(`/api/chapters/${chSummary.id}`);
    assert.equal(ch.status, 200);
    let chSvgs = 0;
    for (const sec of ch.data.sections) {
      for (const blk of sec.blocks) {
        if (blk.type === 'svg') {
          chSvgs += 1;
          totalSvgBlocks += 1;
          assert.ok(
            mathDiagramsSrc.includes(`'${blk.diagramId}'`),
            `Unregistered math SVG diagramId in ${chSummary.id}: ${blk.diagramId}`
          );
        }
      }
    }
    assert.ok(chSvgs >= 1, `Expected at least 1 math SVG plot in ${chSummary.id}`);
  }
  assert.ok(totalSvgBlocks >= 12);

  const fc = await apiJson('/api/subjects/analiza/flashcards');
  assert.equal(fc.status, 200);
  assert.ok(fc.data.items.length >= 60);

  const qz = await apiJson('/api/subjects/analiza/quizzes?limit=100');
  assert.equal(qz.status, 200);
  assert.ok(qz.data.questions.length >= 50);

  const gl = await apiJson('/api/subjects/analiza/glossary');
  assert.equal(gl.status, 200);
  assert.ok(gl.data.length >= 30);
});

test('all 25 Probabilistyka exam topics and 6 chapters are complete and every referenced SVG diagram exists', async () => {
  const probDiagramsSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/ProbDiagrams.jsx'),
    'utf8'
  );

  const { status, data } = await apiJson('/api/subjects/probabilistyka/exam-topics');
  assert.equal(status, 200);
  assert.equal(data.total, 25);
  for (let i = 1; i <= 25; i++) {
    assert.equal(data.items[i - 1].number, i, `Missing probabilistyka exam topic #${i}`);
    assert.ok(data.items[i - 1].full_answer.length > 150, `Probabilistyka topic #${i} too short`);
    assert.ok(data.items[i - 1].key_points.length >= 3, `Probabilistyka topic #${i} needs >=3 key points`);
    if (data.items[i - 1].svg_diagram_id) {
      assert.ok(
        probDiagramsSrc.includes(`'${data.items[i - 1].svg_diagram_id}'`),
        `Unregistered prob SVG diagramId on topic #${i}: ${data.items[i - 1].svg_diagram_id}`
      );
    }
  }

  const subj = await apiJson('/api/subjects/probabilistyka');
  assert.equal(subj.status, 200);
  assert.equal(subj.data.status, 'ready');
  assert.equal(subj.data.chapters.length, 6);

  let totalSvgBlocks = 0;
  for (const chSummary of subj.data.chapters) {
    const ch = await apiJson(`/api/chapters/${chSummary.id}`);
    assert.equal(ch.status, 200);
    let chSvgs = 0;
    for (const sec of ch.data.sections) {
      for (const blk of sec.blocks) {
        if (blk.type === 'svg') {
          chSvgs += 1;
          totalSvgBlocks += 1;
          assert.ok(
            probDiagramsSrc.includes(`'${blk.diagramId}'`),
            `Unregistered prob SVG diagramId in ${chSummary.id}: ${blk.diagramId}`
          );
        }
      }
    }
    assert.ok(chSvgs >= 1, `Expected at least 1 prob SVG diagram in ${chSummary.id}`);
  }
  assert.ok(totalSvgBlocks >= 8);

  const fc = await apiJson('/api/subjects/probabilistyka/flashcards');
  assert.equal(fc.status, 200);
  assert.ok(fc.data.items.length >= 45);

  const qz = await apiJson('/api/subjects/probabilistyka/quizzes?limit=100');
  assert.equal(qz.status, 200);
  assert.ok(qz.data.questions.length >= 40);

  const gl = await apiJson('/api/subjects/probabilistyka/glossary');
  assert.equal(gl.status, 200);
  assert.ok(gl.data.length >= 25);
});

test('all 24 Algebra exam topics and 6 chapters are complete and every referenced SVG diagram exists', async () => {
  const algDiagramsSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/AlgDiagrams.jsx'),
    'utf8'
  );

  const { status, data } = await apiJson('/api/subjects/algebra/exam-topics');
  assert.equal(status, 200);
  assert.equal(data.total, 24);
  for (let i = 1; i <= 24; i++) {
    assert.equal(data.items[i - 1].number, i, `Missing algebra exam topic #${i}`);
    assert.ok(data.items[i - 1].full_answer.length > 150, `Algebra topic #${i} too short`);
    assert.ok(data.items[i - 1].key_points.length >= 3, `Algebra topic #${i} needs >=3 key points`);
    if (data.items[i - 1].svg_diagram_id) {
      assert.ok(
        algDiagramsSrc.includes(`'${data.items[i - 1].svg_diagram_id}'`),
        `Unregistered algebra SVG diagramId on topic #${i}: ${data.items[i - 1].svg_diagram_id}`
      );
    }
  }

  const subj = await apiJson('/api/subjects/algebra');
  assert.equal(subj.status, 200);
  assert.equal(subj.data.status, 'ready');
  assert.equal(subj.data.chapters.length, 6);

  let totalSvgBlocks = 0;
  for (const chSummary of subj.data.chapters) {
    const ch = await apiJson(`/api/chapters/${chSummary.id}`);
    assert.equal(ch.status, 200);
    let chSvgs = 0;
    for (const sec of ch.data.sections) {
      for (const blk of sec.blocks) {
        if (blk.type === 'svg') {
          chSvgs += 1;
          totalSvgBlocks += 1;
          assert.ok(
            algDiagramsSrc.includes(`'${blk.diagramId}'`),
            `Unregistered algebra SVG diagramId in ${chSummary.id}: ${blk.diagramId}`
          );
        }
      }
    }
    assert.ok(chSvgs >= 1, `Expected at least 1 algebra SVG diagram in ${chSummary.id}`);
  }
  assert.ok(totalSvgBlocks >= 6);

  const fc = await apiJson('/api/subjects/algebra/flashcards');
  assert.equal(fc.status, 200);
  assert.ok(fc.data.items.length >= 45);

  const qz = await apiJson('/api/subjects/algebra/quizzes?limit=100');
  assert.equal(qz.status, 200);
  assert.ok(qz.data.questions.length >= 40);

  const gl = await apiJson('/api/subjects/algebra/glossary');
  assert.equal(gl.status, 200);
  assert.ok(gl.data.length >= 25);
});

test('all 28 AiSD exam topics and 8 chapters are complete and every referenced SVG diagram exists', async () => {
  const aisdDiagramsSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/AisdDiagrams.jsx'),
    'utf8'
  );

  const { status, data } = await apiJson('/api/subjects/aisd/exam-topics');
  assert.equal(status, 200);
  assert.equal(data.total, 28);
  for (let i = 1; i <= 28; i++) {
    assert.equal(data.items[i - 1].number, i, `Missing aisd exam topic #${i}`);
    assert.ok(data.items[i - 1].full_answer.length > 150, `AiSD topic #${i} too short`);
    assert.ok(data.items[i - 1].key_points.length >= 3, `AiSD topic #${i} needs >=3 key points`);
    if (data.items[i - 1].svg_diagram_id) {
      assert.ok(
        aisdDiagramsSrc.includes(`'${data.items[i - 1].svg_diagram_id}'`),
        `Unregistered aisd SVG diagramId on topic #${i}: ${data.items[i - 1].svg_diagram_id}`
      );
    }
  }

  const subj = await apiJson('/api/subjects/aisd');
  assert.equal(subj.status, 200);
  assert.equal(subj.data.status, 'ready');
  assert.equal(subj.data.chapters.length, 8);

  let totalSvgBlocks = 0;
  for (const chSummary of subj.data.chapters) {
    const ch = await apiJson(`/api/chapters/${chSummary.id}`);
    assert.equal(ch.status, 200);
    let chSvgs = 0;
    for (const sec of ch.data.sections) {
      for (const blk of sec.blocks) {
        if (blk.type === 'svg') {
          chSvgs += 1;
          totalSvgBlocks += 1;
          assert.ok(
            aisdDiagramsSrc.includes(`'${blk.diagramId}'`),
            `Unregistered aisd SVG diagramId in ${chSummary.id}: ${blk.diagramId}`
          );
        }
      }
    }
    assert.ok(chSvgs >= 1, `Expected at least 1 aisd SVG diagram in ${chSummary.id}`);
  }
  assert.equal(totalSvgBlocks, 8);

  const fc = await apiJson('/api/subjects/aisd/flashcards');
  assert.equal(fc.status, 200);
  assert.equal(fc.data.items.length, 56);

  const qz = await apiJson('/api/subjects/aisd/quizzes?limit=100');
  assert.equal(qz.status, 200);
  assert.equal(qz.data.questions.length, 48);

  const gl = await apiJson('/api/subjects/aisd/glossary');
  assert.equal(gl.status, 200);
  assert.equal(gl.data.length, 30);
});

test('all 20 Fizyka exam topics and 5 chapters are complete, every referenced SVG diagram exists, and all 6/6 subjects are ready without local path leaks', async () => {
  const physDiagramsSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/PhysDiagrams.jsx'),
    'utf8'
  );

  const allSubj = await apiJson('/api/subjects');
  assert.equal(allSubj.status, 200);
  assert.equal(allSubj.data.length, 6);
  for (const s of allSubj.data) {
    assert.equal(s.status, 'ready', `Subject ${s.slug} should be ready`);
    assert.equal(s.source_dir, undefined, `source_dir must not be serialized for ${s.slug}`);
  }
  assert.equal(JSON.stringify(allSubj.data).includes('/home/'), false, 'No local /home/ paths may leak');

  const { status, data } = await apiJson('/api/subjects/fizyka/exam-topics');
  assert.equal(status, 200);
  assert.equal(data.total, 20);
  for (let i = 1; i <= 20; i++) {
    assert.equal(data.items[i - 1].number, i, `Missing fizyka exam topic #${i}`);
    assert.ok(data.items[i - 1].full_answer.length > 150, `Fizyka topic #${i} too short`);
    assert.ok(data.items[i - 1].key_points.length >= 3, `Fizyka topic #${i} needs >=3 key points`);
    if (data.items[i - 1].svg_diagram_id) {
      assert.ok(
        physDiagramsSrc.includes(`'${data.items[i - 1].svg_diagram_id}'`),
        `Unregistered fizyka SVG diagramId on topic #${i}: ${data.items[i - 1].svg_diagram_id}`
      );
    }
  }

  const subj = await apiJson('/api/subjects/fizyka');
  assert.equal(subj.status, 200);
  assert.equal(subj.data.status, 'ready');
  assert.equal(subj.data.chapters.length, 5);

  let totalSvgBlocks = 0;
  for (const chSummary of subj.data.chapters) {
    const ch = await apiJson(`/api/chapters/${chSummary.id}`);
    assert.equal(ch.status, 200);
    let chSvgs = 0;
    for (const sec of ch.data.sections) {
      for (const blk of sec.blocks) {
        if (blk.type === 'svg') {
          chSvgs += 1;
          totalSvgBlocks += 1;
          assert.ok(
            physDiagramsSrc.includes(`'${blk.diagramId}'`),
            `Unregistered fizyka SVG diagramId in ${chSummary.id}: ${blk.diagramId}`
          );
        }
      }
    }
    assert.ok(chSvgs >= 1, `Expected at least 1 fizyka SVG diagram in ${chSummary.id}`);
  }
  assert.equal(totalSvgBlocks, 5);

  const fc = await apiJson('/api/subjects/fizyka/flashcards');
  assert.equal(fc.status, 200);
  assert.equal(fc.data.items.length, 40);

  const qz = await apiJson('/api/subjects/fizyka/quizzes?limit=100');
  assert.equal(qz.status, 200);
  assert.equal(qz.data.questions.length, 36);

  const gl = await apiJson('/api/subjects/fizyka/glossary');
  assert.equal(gl.status, 200);
  assert.equal(gl.data.length, 24);
});

test('all slide images referenced inside Sieci chapters and quizzes exist on disk', async () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const subj = await apiJson('/api/subjects/sieci');
  for (const chSummary of subj.data.chapters) {
    const ch = await apiJson(`/api/chapters/${chSummary.id}`);
    assert.equal(ch.status, 200);
    for (const fig of ch.data.figures) {
      assert.ok(fs.existsSync(path.join(publicDir, fig)), `Missing chapter figure: ${fig}`);
    }
    for (const sec of ch.data.sections) {
      for (const blk of sec.blocks) {
        if (blk.type === 'figure') {
          assert.ok(fs.existsSync(path.join(publicDir, blk.src)), `Missing block figure: ${blk.src}`);
        } else if (blk.type === 'figure_grid') {
          for (const it of blk.items) {
            assert.ok(fs.existsSync(path.join(publicDir, it.src)), `Missing grid figure: ${it.src}`);
          }
        }
      }
    }
  }

  const qz = await apiJson('/api/subjects/sieci/quizzes?limit=100');
  for (const q of qz.data.questions) {
    if (q.figure_url) {
      assert.ok(fs.existsSync(path.join(publicDir, q.figure_url)), `Missing quiz figure: ${q.figure_url}`);
    }
  }
});

test('chapter progress, SM-2 flashcard review, custom card, quiz attempt & topic mastery persist in SQLite across subjects', async () => {
  // 1. Chapter progress & notes
  const pRes = await apiJson('/api/chapters/analiza-ch5/progress', {
    method: 'PUT',
    body: JSON.stringify({ completed: true, read_percent: 100, notes: 'Pamiętać o pułapce de l’Hospitala!' }),
  });
  assert.equal(pRes.status, 200);
  const chGet = await apiJson('/api/chapters/analiza-ch5');
  assert.equal(chGet.data.progress.completed, true);
  assert.equal(chGet.data.progress.notes, 'Pamiętać o pułapce de l’Hospitala!');

  const pProb = await apiJson('/api/chapters/probabilistyka-ch6/progress', {
    method: 'PUT',
    body: JSON.stringify({ completed: true, read_percent: 100, notes: 'Pascal: D(X) = n(1-p)/p^2!' }),
  });
  assert.equal(pProb.status, 200);
  const chProbGet = await apiJson('/api/chapters/probabilistyka-ch6');
  assert.equal(chProbGet.data.progress.completed, true);
  assert.equal(chProbGet.data.progress.notes, 'Pascal: D(X) = n(1-p)/p^2!');

  const pAlg = await apiJson('/api/chapters/algebra-ch6/progress', {
    method: 'PUT',
    body: JSON.stringify({ completed: true, read_percent: 100, notes: 'Kontrola: tr(A)=suma lambda, det(A)=iloczyn' }),
  });
  assert.equal(pAlg.status, 200);
  const chAlgGet = await apiJson('/api/chapters/algebra-ch6');
  assert.equal(chAlgGet.data.progress.completed, true);

  const pAisd = await apiJson('/api/chapters/aisd-ch6/progress', {
    method: 'PUT',
    body: JSON.stringify({ completed: true, read_percent: 100, notes: 'AVL: bf = hL - hR, Heapsort: 1..n!' }),
  });
  assert.equal(pAisd.status, 200);
  const chAisdGet = await apiJson('/api/chapters/aisd-ch6');
  assert.equal(chAisdGet.data.progress.completed, true);

  const pFiz = await apiJson('/api/chapters/fizyka-ch4/progress', {
    method: 'PUT',
    body: JSON.stringify({ completed: true, read_percent: 100, notes: 'III zasada Newtona: siły działają na różne ciała!' }),
  });
  assert.equal(pFiz.status, 200);
  const chFizGet = await apiJson('/api/chapters/fizyka-ch4');
  assert.equal(chFizGet.data.progress.completed, true);

  // 2. SM-2 flashcard review (analiza + probabilistyka + algebra + aisd + fizyka)
  const rev = await apiJson('/api/flashcards/fc-a-001/review', {
    method: 'POST',
    body: JSON.stringify({ rating: 3 }),
  });
  assert.equal(rev.status, 200);
  assert.equal(rev.data.review.repetitions, 1);
  assert.equal(rev.data.review.interval_days, 1);

  const revProb = await apiJson('/api/flashcards/fc-p-001/review', {
    method: 'POST',
    body: JSON.stringify({ rating: 4 }),
  });
  assert.equal(revProb.status, 200);
  assert.equal(revProb.data.review.repetitions, 1);

  const revAlg = await apiJson('/api/flashcards/fc-alg-001/review', {
    method: 'POST',
    body: JSON.stringify({ rating: 3 }),
  });
  assert.equal(revAlg.status, 200);
  assert.equal(revAlg.data.review.repetitions, 1);

  const revAisd = await apiJson('/api/flashcards/fc-aisd-001/review', {
    method: 'POST',
    body: JSON.stringify({ rating: 4 }),
  });
  assert.equal(revAisd.status, 200);
  assert.equal(revAisd.data.review.repetitions, 1);

  const revFiz = await apiJson('/api/flashcards/fc-fiz-001/review', {
    method: 'POST',
    body: JSON.stringify({ rating: 3 }),
  });
  assert.equal(revFiz.status, 200);
  assert.equal(revFiz.data.review.repetitions, 1);

  // 3. Create & delete custom flashcard in analiza
  const created = await apiJson('/api/subjects/analiza/flashcards', {
    method: 'POST',
    body: JSON.stringify({ front: 'Pochodna $\\operatorname{arctg} x$?', back: '$\\frac{1}{1+x^2}$', chapter_id: 'analiza-ch5' }),
  });
  assert.equal(created.status, 201);
  const del = await apiJson(`/api/flashcards/${created.data.id}`, { method: 'DELETE' });
  assert.equal(del.status, 200);

  // 4. Quiz attempt grading (analiza + probabilistyka + algebra + aisd + fizyka)
  const attempt = await apiJson('/api/subjects/analiza/attempts', {
    method: 'POST',
    body: JSON.stringify({
      mode: 'chapter_quiz',
      chapter_id: 'analiza-ch9',
      duration_sec: 32,
      responses: [
        { question_id: 'qz-a-048', selected: [0] }, // correct (1/6)
        { question_id: 'qz-a-052', selected: [0] }, // wrong (trap -2 instead of rozbieżna [3])
      ],
    }),
  });
  assert.equal(attempt.status, 201);
  assert.equal(attempt.data.correct_count, 1);
  assert.equal(attempt.data.score_percent, 50);

  const probAttempt = await apiJson('/api/subjects/probabilistyka/attempts', {
    method: 'POST',
    body: JSON.stringify({
      mode: 'chapter_quiz',
      chapter_id: 'probabilistyka-ch6',
      duration_sec: 25,
      responses: [{ question_id: 'qz-p-037', selected: [1] }],
    }),
  });
  assert.equal(probAttempt.status, 201);
  assert.equal(probAttempt.data.total_questions, 1);

  const algAttempt = await apiJson('/api/subjects/algebra/attempts', {
    method: 'POST',
    body: JSON.stringify({
      mode: 'chapter_quiz',
      chapter_id: 'algebra-ch6',
      duration_sec: 20,
      responses: [{ question_id: 'qz-alg-040', selected: [0] }],
    }),
  });
  assert.equal(algAttempt.status, 201);
  assert.equal(algAttempt.data.correct_count, 1);

  const aisdAttempt = await apiJson('/api/subjects/aisd/attempts', {
    method: 'POST',
    body: JSON.stringify({
      mode: 'chapter_quiz',
      chapter_id: 'aisd-ch7',
      duration_sec: 18,
      responses: [
        { question_id: 'qz-aisd-039', selected: [1] }, // correct: f(4) = 31
        { question_id: 'qz-aisd-040', selected: [0] }, // correct: f(a)*f(c) < 0
      ],
    }),
  });
  assert.equal(aisdAttempt.status, 201);
  assert.equal(aisdAttempt.data.correct_count, 2);
  assert.equal(aisdAttempt.data.score_percent, 100);

  const fizAttempt = await apiJson('/api/subjects/fizyka/attempts', {
    method: 'POST',
    body: JSON.stringify({
      mode: 'chapter_quiz',
      chapter_id: 'fizyka-ch2',
      duration_sec: 15,
      responses: [
        { question_id: 'qz-fiz-013', selected: [1] }, // correct: 45 deg
        { question_id: 'qz-fiz-014', selected: [0] }, // correct: t=2s, Z=30m
      ],
    }),
  });
  assert.equal(fizAttempt.status, 201);
  assert.equal(fizAttempt.data.correct_count, 2);
  assert.equal(fizAttempt.data.score_percent, 100);

  // 5. Exam topic mastery update
  const tm = await apiJson('/api/exam-topics/analiza-q17/progress', {
    method: 'PUT',
    body: JSON.stringify({ status: 'mastered', student_note: 'Taylor: reszta Lagrange’a' }),
  });
  assert.equal(tm.status, 200);
  assert.equal(tm.data.status, 'mastered');

  const tmProb = await apiJson('/api/exam-topics/prob-q22/progress', {
    method: 'PUT',
    body: JSON.stringify({ status: 'mastered', student_note: 'Zbieżność dwumianowego do Poissona' }),
  });
  assert.equal(tmProb.status, 200);
  assert.equal(tmProb.data.status, 'mastered');

  const tmAlg = await apiJson('/api/exam-topics/alg-q22/progress', {
    method: 'PUT',
    body: JSON.stringify({ status: 'mastered', student_note: 'det(A - lambda I) = 0' }),
  });
  assert.equal(tmAlg.status, 200);
  assert.equal(tmAlg.data.status, 'mastered');

  const tmAisd = await apiJson('/api/exam-topics/aisd-q22/progress', {
    method: 'PUT',
    body: JSON.stringify({ status: 'mastered', student_note: 'AVL rotacje LL/RR/LR/RL' }),
  });
  assert.equal(tmAisd.status, 200);
  assert.equal(tmAisd.data.status, 'mastered');

  const tmFiz = await apiJson('/api/exam-topics/fiz-q17/progress', {
    method: 'PUT',
    body: JSON.stringify({ status: 'mastered', student_note: 'Student-Fisher + różniczka logarytmiczna' }),
  });
  assert.equal(tmFiz.status, 200);
  assert.equal(tmFiz.data.status, 'mastered');
});

test('IPv4 subnetting math engine and REST check endpoint are 100% accurate', async () => {
  const s1 = analyzeIpv4Subnet('192.168.10.137', '/26');
  assert.equal(s1.network, '192.168.10.128');
  assert.equal(s1.broadcast, '192.168.10.191');
  assert.equal(s1.firstHost, '192.168.10.129');
  assert.equal(s1.lastHost, '192.168.10.190');
  assert.equal(s1.usableHosts, 62);

  const s2 = analyzeIpv4Subnet('172.16.45.200', '255.255.248.0');
  assert.equal(s2.prefix, 21);
  assert.equal(s2.network, '172.16.40.0');
  assert.equal(s2.broadcast, '172.16.47.255');
  assert.equal(s2.usableHosts, 2046);

  assert.equal(analyzeIpv4Subnet('10.0.0.1', '255.0.255.0'), null);

  const check = await apiJson('/api/subnet/check', {
    method: 'POST',
    body: JSON.stringify({
      ip: '192.168.10.137',
      mask: 26,
      difficulty: 'exam',
      time_sec: 18,
      answers: { network: '192.168.10.128', broadcast: '192.168.10.191', usableHosts: '62' },
    }),
  });
  assert.equal(check.status, 200);
  assert.equal(check.data.is_correct, true);

  const stats = await apiJson('/api/subnet/stats');
  assert.equal(stats.data.total, 1);
  assert.equal(stats.data.accuracy, 100);
  assert.equal(stats.data.streak, 1);
});

test('global search returns results across all 6 subjects (Sieci, Analiza, Probabilistyka, Algebra, AiSD, Fizyka)', async () => {
  const s1 = await apiJson('/api/search?q=ospf');
  assert.equal(s1.status, 200);
  assert.ok(s1.data.topics.some((t) => t.subject_id === 'sieci' && t.number === 53));
  assert.ok(s1.data.chapters.some((c) => c.id === 'sieci-ch8'));

  const s2 = await apiJson('/api/search?q=taylor');
  assert.equal(s2.status, 200);
  assert.ok(s2.data.topics.some((t) => t.subject_id === 'analiza' && t.number === 17));
  assert.ok(s2.data.chapters.some((c) => c.id === 'analiza-ch5'));
  assert.ok(s2.data.glossary.some((g) => g.subject_id === 'analiza'));

  const s3 = await apiJson('/api/search?q=riemann');
  assert.equal(s3.status, 200);
  assert.ok(s3.data.topics.some((t) => t.subject_id === 'analiza' && t.number === 28));
  assert.ok(s3.data.chapters.some((c) => c.id === 'analiza-ch9'));

  const s4 = await apiJson('/api/search?q=poisson');
  assert.equal(s4.status, 200);
  assert.ok(s4.data.topics.some((t) => t.subject_id === 'probabilistyka'));
  assert.ok(s4.data.chapters.some((c) => c.id === 'probabilistyka-ch6'));
  assert.ok(s4.data.glossary.some((g) => g.subject_id === 'probabilistyka'));

  const s5 = await apiJson('/api/search?q=czebyszew');
  assert.equal(s5.status, 200);
  assert.ok(s5.data.topics.some((t) => t.subject_id === 'probabilistyka'));
  assert.ok(s5.data.chapters.some((c) => c.id === 'probabilistyka-ch5'));

  const s6 = await apiJson('/api/search?q=moivre');
  assert.equal(s6.status, 200);
  assert.ok(s6.data.topics.some((t) => t.subject_id === 'algebra'));
  assert.ok(s6.data.chapters.some((c) => c.id === 'algebra-ch2'));
  assert.ok(s6.data.glossary.some((g) => g.subject_id === 'algebra'));

  const s7 = await apiJson('/api/search?q=cramer');
  assert.equal(s7.status, 200);
  assert.ok(s7.data.topics.some((t) => t.subject_id === 'algebra'));
  assert.ok(s7.data.chapters.some((c) => c.id === 'algebra-ch5'));

  const s8 = await apiJson('/api/search?q=heapsort');
  assert.equal(s8.status, 200);
  assert.ok(s8.data.topics.some((t) => t.subject_id === 'aisd' && t.number === 20));
  assert.ok(s8.data.chapters.some((c) => c.id === 'aisd-ch6'));
  assert.ok(s8.data.glossary.some((g) => g.subject_id === 'aisd'));

  const s9 = await apiJson('/api/search?q=bisekcja');
  assert.equal(s9.status, 200);
  assert.ok(s9.data.topics.some((t) => t.subject_id === 'aisd'));
  assert.ok(s9.data.chapters.some((c) => c.id === 'aisd-ch7'));

  const s10 = await apiJson('/api/search?q=avl');
  assert.equal(s10.status, 200);
  assert.ok(s10.data.topics.some((t) => t.subject_id === 'aisd' && t.number === 22));
  assert.ok(s10.data.glossary.some((g) => g.subject_id === 'aisd'));

  const s11 = await apiJson('/api/search?q=stokes');
  assert.equal(s11.status, 200);
  assert.ok(s11.data.topics.some((t) => t.subject_id === 'fizyka'));
  assert.ok(s11.data.chapters.some((c) => c.id === 'fizyka-ch5'));
  assert.ok(s11.data.glossary.some((g) => g.subject_id === 'fizyka'));

  const s12 = await apiJson('/api/search?q=hooke');
  assert.equal(s12.status, 200);
  assert.ok(s12.data.topics.some((t) => t.subject_id === 'fizyka'));
  assert.ok(s12.data.chapters.some((c) => c.id === 'fizyka-ch4'));

  const s13 = await apiJson('/api/search?q=galileusz');
  assert.equal(s13.status, 200);
  assert.ok(s13.data.topics.some((t) => t.subject_id === 'fizyka'));
});
