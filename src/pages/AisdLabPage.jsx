import React, { useMemo, useState } from 'react';
import { GitBranch, Hash, Compass, ChevronLeft, ChevronRight, RotateCcw, Plus, Trash2, Search } from 'lucide-react';

const NAVY = '#1d3557';
const CRIMSON = '#9b2226';
const FOREST = '#2d6a4f';
const AMBER = '#b45309';
const KNUTH_A = (Math.sqrt(5) - 1) / 2;

function fmt(v, d = 5) {
  if (!Number.isFinite(v)) return '—';
  const r = Math.abs(v) < 1e-12 ? 0 : v;
  return Number.isInteger(r) ? String(r) : r.toFixed(d).replace(/\.?0+$/, '');
}

// ============================================================================
// Sorting step generators (7 lecture algorithms)
// ============================================================================
const SORT_META = {
  selection: { name: 'Selection Sort', best: 'Θ(n²)', avg: 'Θ(n²)', worst: 'Θ(n²)', mem: 'O(1)', stable: 'Nie' },
  insertion: { name: 'Insertion Sort', best: 'Θ(n)', avg: 'Θ(n²)', worst: 'Θ(n²)', mem: 'O(1)', stable: 'Tak' },
  bubble: { name: 'Bubble Sort (klasyczny)', best: 'Θ(n²)', avg: 'Θ(n²)', worst: 'Θ(n²)', mem: 'O(1)', stable: 'Tak' },
  bubble_mod: { name: 'Bubble Sort (z flagą)', best: 'Θ(n)', avg: 'Θ(n²)', worst: 'Θ(n²)', mem: 'O(1)', stable: 'Tak' },
  merge: { name: 'Merge Sort', best: 'Θ(n log n)', avg: 'Θ(n log n)', worst: 'Θ(n log n)', mem: 'O(n)', stable: 'Tak' },
  quick: { name: 'Quicksort (Lomuto)', best: 'Θ(n log n)', avg: 'Θ(n log n)', worst: 'Θ(n²)', mem: 'O(log n)', stable: 'Nie' },
  heap: { name: 'Heapsort (1-indeksowany)', best: 'Θ(n log n)', avg: 'Θ(n log n)', worst: 'Θ(n log n)', mem: 'O(1)', stable: 'Nie' },
};

function generateSortSteps(algo, inputArr) {
  const a = [...inputArr];
  const n = a.length;
  let cmp = 0;
  let swp = 0;
  const steps = [
    { arr: [...a], active: [], pivot: -1, sorted: [], cmp: 0, swp: 0, note: `Stan początkowy: [${a.join(', ')}]` },
  ];
  const push = (active, sorted, note, pivot = -1) => {
    steps.push({ arr: [...a], active, pivot, sorted: [...sorted], cmp, swp, note });
  };

  if (algo === 'selection') {
    const sorted = [];
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        cmp++;
        if (a[j] < a[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        swp++;
        sorted.push(i);
        push([i, minIdx], sorted, `i=${i}: zamiana A[${i}] ↔ A[${minIdx}] (minimum = ${a[i]}).`);
      } else {
        sorted.push(i);
        push([i], sorted, `i=${i}: A[${i}] = ${a[i]} jest już minimum — bez zamiany.`);
      }
    }
    push([], Array.from({ length: n }, (_, k) => k), `Zakończono Selection Sort (${cmp} porównań, ${swp} zamian).`);
  } else if (algo === 'insertion') {
    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;
      while (j >= 0) {
        cmp++;
        if (a[j] > key) {
          a[j + 1] = a[j];
          swp++;
          j--;
        } else {
          break;
        }
      }
      a[j + 1] = key;
      push([j + 1], Array.from({ length: i + 1 }, (_, k) => k), `Wstawiono klucz ${key} na indeks ${j + 1} (posortowany prefiks 0..${i}).`);
    }
    push([], Array.from({ length: n }, (_, k) => k), `Zakończono Insertion Sort (${cmp} porównań, ${swp} przesunięć).`);
  } else if (algo === 'bubble' || algo === 'bubble_mod') {
    const sorted = [];
    for (let pass = 0; pass < n - 1; pass++) {
      let swapped = false;
      for (let j = 0; j < n - 1 - pass; j++) {
        cmp++;
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          swp++;
          swapped = true;
          push([j, j + 1], sorted, `Przebieg ${pass + 1}: zamiana sąsiadów ${a[j + 1]} ↔ ${a[j]} (indeksy ${j}, ${j + 1}).`);
        }
      }
      sorted.push(n - 1 - pass);
      if (algo === 'bubble_mod' && !swapped) {
        push([], Array.from({ length: n }, (_, k) => k), `Przebieg ${pass + 1}: 0 zamian (flaga swapped = false) → wcześniejsze wyjście w O(n)!`);
        break;
      } else {
        push([n - 1 - pass], sorted, `Koniec przebiegu ${pass + 1}: ${a[n - 1 - pass]} ustalone na pozycji ${n - 1 - pass}.`);
      }
    }
    push([], Array.from({ length: n }, (_, k) => k), `Zakończono Bubble Sort (${cmp} porównań, ${swp} zamian).`);
  } else if (algo === 'merge') {
    const mergeRange = (l, m, r) => {
      const L = a.slice(l, m + 1);
      const R = a.slice(m + 1, r + 1);
      let i = 0;
      let j = 0;
      let k = l;
      while (i < L.length && j < R.length) {
        cmp++;
        if (L[i] <= R[j]) a[k++] = L[i++];
        else a[k++] = R[j++];
        swp++;
      }
      while (i < L.length) { a[k++] = L[i++]; swp++; }
      while (j < R.length) { a[k++] = R[j++]; swp++; }
      const mergedIdxs = Array.from({ length: r - l + 1 }, (_, t) => l + t);
      push(mergedIdxs, l === 0 && r === n - 1 ? mergedIdxs : [], `Scalono podtablice [${l}..${m}] i [${m + 1}..${r}] → [${a.slice(l, r + 1).join(', ')}].`);
    };
    const sortRec = (l, r) => {
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      sortRec(l, m);
      sortRec(m + 1, r);
      mergeRange(l, m, r);
    };
    sortRec(0, n - 1);
    push([], Array.from({ length: n }, (_, k) => k), `Zakończono Merge Sort (${cmp} porównań, ${swp} zapisów do tablicy).`);
  } else if (algo === 'quick') {
    const fixed = new Set();
    const qs = (l, r) => {
      if (l >= r) {
        if (l === r) fixed.add(l);
        return;
      }
      const pivotVal = a[r];
      let i = l - 1;
      for (let j = l; j < r; j++) {
        cmp++;
        if (a[j] <= pivotVal) {
          i++;
          if (i !== j) {
            [a[i], a[j]] = [a[j], a[i]];
            swp++;
          }
        }
      }
      const pIdx = i + 1;
      if (pIdx !== r) {
        [a[pIdx], a[r]] = [a[r], a[pIdx]];
        swp++;
      }
      fixed.add(pIdx);
      push([pIdx], Array.from(fixed), `Partition [${l}..${r}]: pivot = ${pivotVal} trafił na docelowy indeks ${pIdx}.`, pIdx);
      qs(l, pIdx - 1);
      qs(pIdx + 1, r);
    };
    qs(0, n - 1);
    push([], Array.from({ length: n }, (_, k) => k), `Zakończono Quicksort (${cmp} porównań, ${swp} zamian).`);
  } else if (algo === 'heap') {
    // 1-indexed logic projected onto 0..n-1 array
    const siftDown = (start, end, sorted) => {
      let root = start;
      while (2 * root + 1 <= end) {
        let child = 2 * root + 1;
        if (child + 1 <= end) {
          cmp++;
          if (a[child] < a[child + 1]) child++;
        }
        cmp++;
        if (a[root] < a[child]) {
          [a[root], a[child]] = [a[child], a[root]];
          swp++;
          root = child;
        } else {
          break;
        }
      }
    };
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      siftDown(i, n - 1, []);
    }
    push([0], [], `Etap 1: zbudowano max-heap → korzeń A[1] = ${a[0]}, tablica [${a.join(', ')}].`);
    const sorted = [];
    for (let end = n - 1; end > 0; end--) {
      [a[0], a[end]] = [a[end], a[0]];
      swp++;
      sorted.push(end);
      siftDown(0, end - 1, sorted);
      push([0, end], sorted, `Etap 2: zdjęto maksimum ${a[end]} na indeks ${end} i przesiano kopiec (rozmiar ${end}).`);
    }
    push([], Array.from({ length: n }, (_, k) => k), `Zakończono Heapsort (${cmp} porównań, ${swp} zamian).`);
  }
  return steps;
}

// ============================================================================
// BST helper for Tab 2
// ============================================================================
function insertBst(root, val) {
  if (!root) return { val, left: null, right: null };
  if (val < root.val) return { ...root, left: insertBst(root.left, val) };
  if (val > root.val) return { ...root, right: insertBst(root.right, val) };
  return root;
}

function annotateBst(node) {
  if (!node) return null;
  const left = annotateBst(node.left);
  const right = annotateBst(node.right);
  const hL = left ? left.h : 0;
  const hR = right ? right.h : 0;
  return { ...node, left, right, h: Math.max(hL, hR) + 1, bf: hL - hR };
}

function traverseBst(root) {
  const pre = [];
  const ino = [];
  const post = [];
  const bfs = [];
  const dfs = (n) => {
    if (!n) return;
    pre.push(n.val);
    dfs(n.left);
    ino.push(n.val);
    dfs(n.right);
    post.push(n.val);
  };
  dfs(root);
  if (root) {
    const q = [root];
    while (q.length) {
      const cur = q.shift();
      bfs.push(cur.val);
      if (cur.left) q.push(cur.left);
      if (cur.right) q.push(cur.right);
    }
  }
  return { pre, ino, post, bfs };
}

function layoutBst(root, width = 520) {
  const nodes = [];
  const edges = [];
  const visit = (n, depth, xMin, xMax, parentPos = null) => {
    if (!n || depth > 5) return;
    const x = (xMin + xMax) / 2;
    const y = 30 + depth * 52;
    nodes.push({ val: n.val, x, y, h: n.h, bf: n.bf });
    if (parentPos) edges.push({ x1: parentPos.x, y1: parentPos.y, x2: x, y2: y });
    visit(n.left, depth + 1, xMin, x, { x, y });
    visit(n.right, depth + 1, x, xMax, { x, y });
  };
  visit(root, 0, 16, width - 16);
  return { nodes, edges };
}

// ============================================================================
// Numerical Presets for Tab 3
// ============================================================================
const NUM_PRESETS = [
  {
    id: 'cubic',
    label: 'f(x) = x³ − 2x² + x − 5 (Wykład 6)',
    f: (x) => x * x * x - 2 * x * x + x - 5,
    df: (x) => 3 * x * x - 4 * x + 1,
    a: 1,
    b: 4,
    x0: 3,
    x1: 3.5,
    optA: 0.4,
    optB: 2.0,
    note: 'Przykład wykładowy (W6 sl. 19–29): f(1) = −5, f(4) = 31 (skorygowano slajdowe 34!), pierwiastek x* ≈ 2,433531, minimum lokalne x_min = 1.',
  },
  {
    id: 'sqrt2',
    label: 'f(x) = x² − 2 (pierwiastek √2)',
    f: (x) => x * x - 2,
    df: (x) => 2 * x,
    a: 1,
    b: 2,
    x0: 2,
    x1: 1.8,
    optA: -2,
    optB: 2,
    note: 'Klasyczne równanie dla √2 ≈ 1,41421356 — metoda Newtona pokrywa się tu dokładnie ze wzorem Herona!',
  },
  {
    id: 'dottie',
    label: 'f(x) = cos(x) − x (punkt stały cos)',
    f: (x) => Math.cos(x) - x,
    df: (x) => -Math.sin(x) - 1,
    a: 0,
    b: 1.5,
    x0: 1.0,
    x1: 0.5,
    optA: 0,
    optB: 3,
    note: 'Równanie przestępne cos(x) = x; jedyne rozwiązanie rzeczywiste to liczba Dottiego x* ≈ 0,73908513.',
  },
  {
    id: 'exp',
    label: 'f(x) = eˣ − 3x − 2',
    f: (x) => Math.exp(x) - 3 * x - 2,
    df: (x) => Math.exp(x) - 3,
    a: 1,
    b: 3,
    x0: 2.5,
    x1: 2.2,
    optA: 0,
    optB: 2.5,
    note: 'Równanie mieszane wykładniczo-liniowe; minimum w x = ln(3) ≈ 1,09861, pierwiastek dodatni x* ≈ 2,12539.',
  },
];

function runNumericSolvers(preset, eps) {
  const { f, df, a: a0, b: b0, x0, x1 } = preset;
  const maxIter = 40;

  // 1. Bisection
  const bisection = [];
  if (f(a0) * f(b0) < 0) {
    let a = a0;
    let b = b0;
    for (let k = 1; k <= maxIter; k++) {
      const c = (a + b) / 2;
      const fc = f(c);
      bisection.push({ k, a, b, x: c, fx: fc, err: (b - a) / 2 });
      if (Math.abs(fc) < eps || (b - a) / 2 < eps) break;
      if (f(a) * fc < 0) b = c;
      else a = c;
    }
  }

  // 2. Regula Falsi
  const falsi = [];
  if (f(a0) * f(b0) < 0) {
    let a = a0;
    let b = b0;
    let prevC = a;
    for (let k = 1; k <= maxIter; k++) {
      const fa = f(a);
      const fb = f(b);
      const c = (a * fb - b * fa) / (fb - fa);
      const fc = f(c);
      const err = Math.abs(c - prevC);
      falsi.push({ k, a, b, x: c, fx: fc, err });
      if (Math.abs(fc) < eps || (k > 1 && err < eps)) break;
      if (fa * fc < 0) b = c;
      else a = c;
      prevC = c;
    }
  }

  // 3. Secant
  const secant = [];
  {
    let p0 = x0;
    let p1 = x1;
    for (let k = 1; k <= maxIter; k++) {
      const f0 = f(p0);
      const f1 = f(p1);
      if (Math.abs(f1 - f0) < 1e-15) break;
      const p2 = p1 - (f1 * (p1 - p0)) / (f1 - f0);
      const f2 = f(p2);
      const err = Math.abs(p2 - p1);
      secant.push({ k, a: p0, b: p1, x: p2, fx: f2, err });
      if (Math.abs(f2) < eps || err < eps) break;
      p0 = p1;
      p1 = p2;
    }
  }

  // 4. Newton-Raphson
  const newton = [];
  {
    let cur = x0;
    for (let k = 1; k <= maxIter; k++) {
      const fx = f(cur);
      const dfx = df(cur);
      if (Math.abs(dfx) < 1e-14) break;
      const next = cur - fx / dfx;
      const err = Math.abs(next - cur);
      newton.push({ k, a: cur, b: dfx, x: next, fx: f(next), err });
      if (Math.abs(f(next)) < eps || err < eps) break;
      cur = next;
    }
  }

  // 5. Golden Section Search (minimization on [optA, optB])
  const golden = [];
  {
    let a = preset.optA;
    let b = preset.optB;
    let g1 = KNUTH_A * a + (1 - KNUTH_A) * b;
    let g2 = (1 - KNUTH_A) * a + KNUTH_A * b;
    let fg1 = f(g1);
    let fg2 = f(g2);
    for (let k = 1; k <= 30; k++) {
      golden.push({ k, a, b, x1: g1, x2: g2, f1: fg1, f2: fg2, width: b - a });
      if (b - a < eps) break;
      if (fg1 < fg2) {
        b = g2;
        g2 = g1;
        fg2 = fg1;
        g1 = KNUTH_A * a + (1 - KNUTH_A) * b;
        fg1 = f(g1);
      } else {
        a = g1;
        g1 = g2;
        fg1 = fg2;
        g2 = (1 - KNUTH_A) * a + KNUTH_A * b;
        fg2 = f(g2);
      }
    }
  }

  return { bisection, falsi, secant, newton, golden };
}

export function AisdLabPage() {
  const [tab, setTab] = useState('sort'); // 'sort' | 'structures' | 'numeric'

  // ---- TAB 1: Sorting & Binary Search ----
  const [sortAlgo, setSortAlgo] = useState('selection');
  const [rawInput, setRawInput] = useState('4, 2, 5, 6, 1');
  const [stepIdx, setStepIdx] = useState(0);
  const [bsTarget, setBsTarget] = useState(5);

  const parsedArray = useMemo(() => {
    const nums = rawInput
      .split(/[\s,;]+/)
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n))
      .slice(0, 12);
    return nums.length >= 2 ? nums : [4, 2, 5, 6, 1];
  }, [rawInput]);

  const sortSteps = useMemo(() => generateSortSteps(sortAlgo, parsedArray), [sortAlgo, parsedArray]);
  const curSortStep = sortSteps[Math.min(stepIdx, sortSteps.length - 1)];
  const maxBarVal = Math.max(1, ...parsedArray.map((v) => Math.abs(v)));

  const sortedForBs = useMemo(() => [...parsedArray].sort((x, y) => x - y), [parsedArray]);
  const bsTrace = useMemo(() => {
    const out = [];
    let l = 0;
    let r = sortedForBs.length - 1;
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      const val = sortedForBs[m];
      out.push({ l, m, r, val, hit: val === bsTarget });
      if (val === bsTarget) break;
      if (val < bsTarget) l = m + 1;
      else r = m - 1;
    }
    return out;
  }, [sortedForBs, bsTarget]);

  // ---- TAB 2: Hash Table & BST / AVL ----
  const [hashN, setHashN] = useState(11);
  const [hashFn, setHashFn] = useState('div'); // 'div' | 'knuth'
  const [hashCol, setHashCol] = useState('linear'); // 'chaining' | 'linear' | 'quadratic' | 'double'
  const [hashKeys, setHashKeys] = useState([10, 21, 32, 15, 26, 44, 7]);
  const [newHashKey, setNewHashKey] = useState('');
  const [deletedKeys, setDeletedKeys] = useState([]);
  const [searchKey, setSearchKey] = useState('32');

  const hashState = useMemo(() => {
    const baseHash = (k) => {
      if (hashFn === 'div') return ((k % hashN) + hashN) % hashN;
      const frac = (Math.abs(k) * KNUTH_A) % 1;
      return Math.floor(hashN * frac);
    };
    const step2 = (k) => 1 + (Math.abs(k) % Math.max(1, hashN - 1));

    if (hashCol === 'chaining') {
      const buckets = Array.from({ length: hashN }, () => []);
      let collisions = 0;
      for (const k of hashKeys) {
        if (deletedKeys.includes(k)) continue;
        const h = baseHash(k);
        if (buckets[h].length > 0) collisions++;
        buckets[h].push(k);
      }
      const activeCount = hashKeys.filter((k) => !deletedKeys.includes(k)).length;
      const targetNum = Number(searchKey);
      const searchBucket = Number.isFinite(targetNum) ? baseHash(targetNum) : null;
      const found = searchBucket !== null && buckets[searchBucket].includes(targetNum);
      return { mode: 'chaining', buckets, collisions, activeCount, alpha: activeCount / hashN, searchTrace: searchBucket !== null ? [searchBucket] : [], found };
    }

    const slots = Array(hashN).fill(null);
    let collisions = 0;
    for (const k of hashKeys) {
      const h0 = baseHash(k);
      for (let i = 0; i < hashN; i++) {
        let idx = h0;
        if (hashCol === 'linear') idx = (h0 + i) % hashN;
        else if (hashCol === 'quadratic') idx = (h0 + i * i) % hashN;
        else idx = (h0 + i * step2(k)) % hashN;

        if (slots[idx] === null) {
          if (i > 0) collisions++;
          slots[idx] = { k, h0, step: i, deleted: deletedKeys.includes(k) };
          break;
        }
      }
    }
    const activeCount = slots.filter((s) => s && !s.deleted).length;
    const targetNum = Number(searchKey);
    const searchTrace = [];
    let found = false;
    if (Number.isFinite(targetNum)) {
      const h0 = baseHash(targetNum);
      for (let i = 0; i < hashN; i++) {
        let idx = h0;
        if (hashCol === 'linear') idx = (h0 + i) % hashN;
        else if (hashCol === 'quadratic') idx = (h0 + i * i) % hashN;
        else idx = (h0 + i * step2(targetNum)) % hashN;
        searchTrace.push(idx);
        const s = slots[idx];
        if (s === null) break;
        if (!s.deleted && s.k === targetNum) {
          found = true;
          break;
        }
      }
    }
    return { mode: 'open', slots, collisions, activeCount, alpha: activeCount / hashN, searchTrace, found };
  }, [hashN, hashFn, hashCol, hashKeys, deletedKeys, searchKey]);

  const [bstKeys, setBstKeys] = useState([10, 5, 15, 2, 7, 12, 18]);
  const [newBstKey, setNewBstKey] = useState('');

  const bstData = useMemo(() => {
    let root = null;
    for (const k of bstKeys) root = insertBst(root, k);
    const ann = annotateBst(root);
    const trav = traverseBst(ann);
    const layout = layoutBst(ann, 520);
    const unbalanced = layout.nodes.filter((n) => Math.abs(n.bf) > 1);
    return { ann, trav, layout, unbalanced };
  }, [bstKeys]);

  // ---- TAB 3: Numerical Methods (Lecture 6) ----
  const [presetId, setPresetId] = useState('cubic');
  const [epsExp, setEpsExp] = useState(-5);
  const [detailMethod, setDetailMethod] = useState('newton');
  const [heronS, setHeronS] = useState(9);

  const activePreset = NUM_PRESETS.find((p) => p.id === presetId) || NUM_PRESETS[0];
  const eps = Math.pow(10, epsExp);
  const solvers = useMemo(() => runNumericSolvers(activePreset, eps), [activePreset, eps]);

  const heronSteps = useMemo(() => {
    const s = Math.max(0.01, heronS);
    const out = [];
    let x = Math.max(1, s);
    const exact = Math.sqrt(s);
    for (let k = 0; k <= 6; k++) {
      out.push({ k, x, err: Math.abs(x - exact) });
      x = 0.5 * (x + s / x);
    }
    return { exact, out };
  }, [heronS]);

  const activeDetailRows = solvers[detailMethod] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="pb-4 border-b border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
          Algorytmy i struktury danych · Interaktywne środowisko ćwiczeniowe (W1–W6)
        </div>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">
          Laboratorium AiSD
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 mb-0 max-w-2xl">
          Prześledź krok po kroku 7 algorytmów sortowania i wyszukiwanie binarne, przetestuj kolizje i znaczniki DELETED w tablicach haszujących, badaj wyważenie BST/AVL oraz porównuj zbieżność metod numerycznych z Wykładu 6.
        </p>
      </header>

      {/* 3-Tab Switcher */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'sort', label: '1. Sortowanie i Binary Search', icon: GitBranch },
          { id: 'structures', label: '2. Tablice rozproszone i BST / AVL', icon: Hash },
          { id: 'numeric', label: '3. Solver metod numerycznych (W6)', icon: Compass },
        ].map((t) => {
          const Icon = t.icon;
          const act = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3.5 py-2 rounded text-xs font-medium border inline-flex items-center gap-2 cursor-pointer transition-colors ${
                act
                  ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)] font-semibold'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* TAB 1: SORTING & BINARY SEARCH                                     */}
      {/* ================================================================== */}
      {tab === 'sort' && (
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif-heading text-lg font-bold m-0">
                  Wizualizator sortowania krok po kroku
                </h2>
                <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">
                  Wybierz algorytm i dane wejściowe (domyślnie ciągi wykładowe prowadzącego z W4 i W5).
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { lbl: 'W4: [4,2,5,6,1]', val: '4, 2, 5, 6, 1' },
                  { lbl: 'W5 Heap: [4,2,1,5,6,3,8,4]', val: '4, 2, 1, 5, 6, 3, 8, 4' },
                  { lbl: 'Posortowane', val: '1, 2, 3, 4, 5, 6' },
                  { lbl: 'Odwrotne', val: '6, 5, 4, 3, 2, 1' },
                ].map((pr) => (
                  <button
                    key={pr.lbl}
                    type="button"
                    onClick={() => {
                      setRawInput(pr.val);
                      setStepIdx(0);
                    }}
                    className="px-2 py-1 rounded text-[11px] font-mono bg-[var(--bg-subtle)] hover:border-[var(--accent)] border border-[var(--border)] text-[var(--text-secondary)] cursor-pointer"
                  >
                    {pr.lbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-6">
                <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">Algorytm</label>
                <select
                  value={sortAlgo}
                  onChange={(e) => {
                    setSortAlgo(e.target.value);
                    setStepIdx(0);
                  }}
                  className="input-field text-sm"
                >
                  {Object.entries(SORT_META).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.name} — śr. {v.avg}, pam. {v.mem}, stab.: {v.stable}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-6">
                <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                  Tablica wejściowa (2–12 liczb rozdzielonych przecinkami)
                </label>
                <input
                  type="text"
                  value={rawInput}
                  onChange={(e) => {
                    setRawInput(e.target.value);
                    setStepIdx(0);
                  }}
                  className="input-field text-sm font-mono"
                />
              </div>
            </div>

            {/* Meta badges */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              <div className="card-subtle px-3 py-2">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Optymistyczna</div>
                <div className="font-bold text-[var(--text)] mt-0.5">{SORT_META[sortAlgo].best}</div>
              </div>
              <div className="card-subtle px-3 py-2">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Średnia</div>
                <div className="font-bold text-[var(--text)] mt-0.5">{SORT_META[sortAlgo].avg}</div>
              </div>
              <div className="card-subtle px-3 py-2">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Pesymistyczna</div>
                <div className="font-bold text-[var(--text)] mt-0.5">{SORT_META[sortAlgo].worst}</div>
              </div>
              <div className="card-subtle px-3 py-2">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Pamięć / Stabilny</div>
                <div className="font-bold text-[var(--text)] mt-0.5">{SORT_META[sortAlgo].mem} · {SORT_META[sortAlgo].stable}</div>
              </div>
              <div className="card-subtle px-3 py-2">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Licznik (krok {Math.min(stepIdx, sortSteps.length - 1) + 1}/{sortSteps.length})</div>
                <div className="font-bold text-[var(--accent-text)] mt-0.5 tabular-nums">
                  {curSortStep.cmp} por. · {curSortStep.swp} zam.
                </div>
              </div>
            </div>

            {/* Bar Chart SVG */}
            <svg viewBox="0 0 600 205" className="w-full max-w-[680px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
              {curSortStep.arr.map((val, idx) => {
                const count = curSortStep.arr.length;
                const slotW = 540 / count;
                const barW = Math.max(18, Math.min(54, slotW - 12));
                const x = 30 + idx * slotW + (slotW - barW) / 2;
                const barH = Math.max(16, (Math.abs(val) / maxBarVal) * 125);
                const y = 166 - barH;
                const isPivot = curSortStep.pivot === idx;
                const isAct = curSortStep.active.includes(idx);
                const isDone = curSortStep.sorted.includes(idx);
                const fill = isPivot ? AMBER : isAct ? CRIMSON : isDone ? FOREST : NAVY;
                return (
                  <g key={idx}>
                    <rect x={x} y={y} width={barW} height={barH} rx="3" fill={fill} opacity={isAct || isPivot ? 0.92 : isDone ? 0.85 : 0.72} />
                    <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="700" fill="var(--text)">{val}</text>
                    <text x={x + barW / 2} y="186" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">[{idx}]</text>
                  </g>
                );
              })}
            </svg>

            {/* Scrubber controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setStepIdx(0)} className="btn-secondary !py-1 !px-2.5 text-xs">
                  <RotateCcw className="w-3.5 h-3.5" /> Start
                </button>
                <button
                  type="button"
                  disabled={stepIdx === 0}
                  onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
                  className="btn-secondary !py-1 !px-2.5 text-xs disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Poprzedni
                </button>
                <button
                  type="button"
                  disabled={stepIdx >= sortSteps.length - 1}
                  onClick={() => setStepIdx((s) => Math.min(sortSteps.length - 1, s + 1))}
                  className="btn-primary !py-1 !px-3 text-xs disabled:opacity-40"
                >
                  Następny <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => setStepIdx(sortSteps.length - 1)} className="btn-secondary !py-1 !px-2.5 text-xs">
                  Koniec
                </button>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(0, sortSteps.length - 1)}
                value={Math.min(stepIdx, sortSteps.length - 1)}
                onChange={(e) => setStepIdx(Number(e.target.value))}
                className="flex-1 min-w-[160px] accent-[var(--accent)]"
              />
            </div>

            <div className="px-3.5 py-2.5 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)]">
              {curSortStep.note}
            </div>
          </div>

          {/* Binary Search Tracer */}
          <div className="card p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-heading text-base font-bold m-0">
                  Wyszukiwanie binarne (Binary Search — O(log₂ n)) na posortowanej tablicy
                </h3>
                <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">
                  Posortowana tablica: [{sortedForBs.join(', ')}] (n = {sortedForBs.length}, maks. ⌊log₂ n⌋ + 1 = {Math.floor(Math.log2(sortedForBs.length)) + 1} kroków)
                </p>
              </div>
              <label className="flex items-center gap-2 text-xs font-mono">
                Szukany klucz x =
                <input
                  type="number"
                  value={bsTarget}
                  onChange={(e) => setBsTarget(Number(e.target.value))}
                  className="input-field !w-20 text-xs font-mono"
                />
              </label>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              {bsTrace.map((st, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded border flex flex-wrap justify-between gap-2 ${
                    st.hit
                      ? 'bg-[var(--success-soft)] border-[var(--success)] text-[var(--success)] font-semibold'
                      : 'bg-[var(--bg-subtle)] border-[var(--border)] text-[var(--text-secondary)]'
                  }`}
                >
                  <span>
                    Krok {idx + 1}: przedział [l={st.l}, r={st.r}] → środek m = {st.m}, A[{st.m}] = {st.val}
                  </span>
                  <span>
                    {st.hit
                      ? `ZNALEZIONO pod indeksem ${st.m} ✓`
                      : st.val < bsTarget
                        ? `${st.val} < ${bsTarget} → odrzuć lewą połowę (l = ${st.m + 1})`
                        : `${st.val} > ${bsTarget} → odrzuć prawą połowę (r = ${st.m - 1})`}
                  </span>
                </div>
              ))}
              {!bsTrace.some((s) => s.hit) && (
                <div className="px-3 py-1.5 rounded bg-[var(--danger-soft)] border border-[var(--danger)] text-[var(--danger)]">
                  Przedział pusty (l &gt; r): klucz {bsTarget} nie występuje w tablicy ({bsTrace.length} porównań).
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* TAB 2: HASH TABLE & BST / AVL                                      */}
      {/* ================================================================== */}
      {tab === 'structures' && (
        <div className="space-y-5">
          {/* Hash Table Simulator */}
          <div className="card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif-heading text-lg font-bold m-0">
                  Symulator tablicy rozproszonej T = (K, D, h)
                </h2>
                <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">
                  Porównuj dzielenie vs metodę mnożenia Knutha (A ≈ 0,618034) oraz usuwanie ze znacznikiem DELETED.
                </p>
              </div>
              <div className="text-xs font-mono px-3 py-1.5 rounded bg-[var(--bg-subtle)] border border-[var(--border)] tabular-nums">
                α = {hashState.activeCount}/{hashN} = <strong>{hashState.alpha.toFixed(2)}</strong> · kolizje: <strong>{hashState.collisions}</strong>
                {hashCol !== 'chaining' && hashState.alpha < 1 && (
                  <span> · 1/(1−α) = {(1 / (1 - hashState.alpha)).toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-[var(--text-muted)] mb-1">Rozmiar N</label>
                <select value={hashN} onChange={(e) => setHashN(Number(e.target.value))} className="input-field text-xs font-mono">
                  {[7, 11, 13, 16].map((nv) => (
                    <option key={nv} value={nv}>
                      N = {nv} {nv === 16 ? '(potęga 2⁴ — uwaga!)' : '(liczba pierwsza)'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-[var(--text-muted)] mb-1">Funkcja mieszająca</label>
                <select value={hashFn} onChange={(e) => setHashFn(e.target.value)} className="input-field text-xs">
                  <option value="div">Dzielenie: k mod N</option>
                  <option value="knuth">Mnożenie Knutha: ⌊N(kA mod 1)⌋</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-[var(--text-muted)] mb-1">Rozwiązywanie kolizji</label>
                <select value={hashCol} onChange={(e) => setHashCol(e.target.value)} className="input-field text-xs">
                  <option value="chaining">Łańcuchowanie (listy)</option>
                  <option value="linear">Otwarte: liniowe (+i)</option>
                  <option value="quadratic">Otwarte: kwadratowe (+i²)</option>
                  <option value="double">Otwarte: podwójne haszowanie</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-[var(--text-muted)] mb-1">Śledź wyszukiwanie klucza</label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="input-field !pl-8 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Add / reset keys */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                placeholder="Dodaj klucz (np. 43)"
                value={newHashKey}
                onChange={(e) => setNewHashKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newHashKey.trim() !== '') {
                    const num = Number(newHashKey);
                    if (Number.isFinite(num) && !hashKeys.includes(num)) setHashKeys((p) => [...p, num]);
                    setNewHashKey('');
                  }
                }}
                className="input-field !w-44 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  const num = Number(newHashKey);
                  if (newHashKey.trim() !== '' && Number.isFinite(num) && !hashKeys.includes(num)) {
                    setHashKeys((p) => [...p, num]);
                    setNewHashKey('');
                  }
                }}
                className="btn-primary !py-1.5 !px-3 text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Wstaw
              </button>
              <button
                type="button"
                onClick={() => {
                  setHashKeys([10, 21, 32, 15, 26, 44, 7]);
                  setDeletedKeys([]);
                }}
                className="btn-secondary !py-1.5 !px-3 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Resetuj przykład
              </button>
              <span className="text-[11px] text-[var(--text-muted)]">
                Kliknij zajęty slot, aby przełączyć znacznik <code className="prose-code">DELETED</code> (tombstone).
              </span>
            </div>

            {/* Table visualization */}
            {hashState.mode === 'chaining' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono">
                {hashState.buckets.map((list, idx) => {
                  const inTrace = hashState.searchTrace.includes(idx);
                  return (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded border flex items-center gap-2 ${
                        inTrace ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : 'border-[var(--border)] bg-[var(--bg-subtle)]'
                      }`}
                    >
                      <span className="font-bold text-[var(--text-muted)] w-8">[{idx}]</span>
                      <div className="flex flex-wrap gap-1.5">
                        {list.length === 0 ? (
                          <span className="text-[var(--text-muted)]">∅</span>
                        ) : (
                          list.map((k) => (
                            <span key={k} className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-strong)] font-bold text-[var(--text)]">
                              {k}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-2 text-center text-xs font-mono">
                {hashState.slots.map((slot, idx) => {
                  const inTrace = hashState.searchTrace.includes(idx);
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={!slot}
                      onClick={() => {
                        if (!slot) return;
                        setDeletedKeys((prev) =>
                          prev.includes(slot.k) ? prev.filter((x) => x !== slot.k) : [...prev, slot.k]
                        );
                      }}
                      className={`p-2 rounded border text-center transition-colors ${
                        slot ? 'cursor-pointer' : 'cursor-default'
                      } ${
                        inTrace
                          ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]'
                          : 'border-[var(--border)]'
                      } ${
                        !slot
                          ? 'bg-[var(--bg)] text-[var(--text-muted)]'
                          : slot.deleted
                            ? 'bg-[var(--danger-soft)] text-[var(--danger)]'
                            : slot.step > 0
                              ? 'bg-[var(--warning-soft)] text-[var(--text)]'
                              : 'bg-[var(--bg-elevated)] text-[var(--text)]'
                      }`}
                    >
                      <div className="text-[10px] text-[var(--text-muted)]">[{idx}]</div>
                      <div className="font-bold text-sm mt-0.5">
                        {!slot ? '—' : slot.deleted ? 'DEL' : slot.k}
                      </div>
                      <div className="text-[9.5px] text-[var(--text-muted)]">
                        {!slot ? 'EMPTY' : slot.deleted ? `był ${slot.k}` : `h₀=${slot.h0}, i=${slot.step}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)]">
              Ślad szukania klucza <strong>{searchKey}</strong>: odwiedzone indeksy{' '}
              <strong>[{hashState.searchTrace.join(' → ')}]</strong> →{' '}
              <span className={hashState.found ? 'text-[var(--success)] font-bold' : 'text-[var(--danger)] font-bold'}>
                {hashState.found ? 'ZNALEZIONO ✓' : 'NIE ZNALEZIONO (zatrzymano na EMPTY / końcu tablicy)'}
              </span>
            </div>
          </div>

          {/* Interactive BST & AVL Balance Analyzer */}
          <div className="card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif-heading text-lg font-bold m-0">
                  Budowniczy BST z analizą współczynników AVL (bf = h_L − h_R)
                </h2>
                <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">
                  Węzły z |bf| &gt; 1 są oznaczane na czerwono (wymagają rotacji AVL!).
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { lbl: 'Zrównoważone', keys: [10, 5, 15, 2, 7, 12, 18] },
                  { lbl: 'Zdegenerowane (lista!)', keys: [1, 2, 3, 4, 5] },
                  { lbl: 'Przypadek AVL LR', keys: [30, 10, 20] },
                  { lbl: 'W5 sl. 55', keys: [8, 3, 14, 2, 5, 11, 18] },
                ].map((pr) => (
                  <button
                    key={pr.lbl}
                    type="button"
                    onClick={() => setBstKeys(pr.keys)}
                    className="px-2 py-1 rounded text-[11px] font-mono bg-[var(--bg-subtle)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-secondary)] cursor-pointer"
                  >
                    {pr.lbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                placeholder="Wstaw klucz do BST..."
                value={newBstKey}
                onChange={(e) => setNewBstKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newBstKey.trim() !== '') {
                    const num = Number(newBstKey);
                    if (Number.isFinite(num) && !bstKeys.includes(num)) setBstKeys((p) => [...p, num]);
                    setNewBstKey('');
                  }
                }}
                className="input-field !w-44 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  const num = Number(newBstKey);
                  if (newBstKey.trim() !== '' && Number.isFinite(num) && !bstKeys.includes(num)) {
                    setBstKeys((p) => [...p, num]);
                    setNewBstKey('');
                  }
                }}
                className="btn-primary !py-1.5 !px-3 text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Wstaw węzeł
              </button>
              <button type="button" onClick={() => setBstKeys([])} className="btn-secondary !py-1.5 !px-3 text-xs">
                <Trash2 className="w-3.5 h-3.5" /> Wyczyść
              </button>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Kolejność wstawiania: [{bstKeys.join(', ')}]
              </span>
            </div>

            <svg viewBox="0 0 520 285" className="w-full max-w-[580px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
              {bstData.layout.edges.map((e, i) => (
                <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="var(--border-strong)" strokeWidth="1.7" />
              ))}
              {bstData.layout.nodes.map((nd) => {
                const bad = Math.abs(nd.bf) > 1;
                return (
                  <g key={nd.val}>
                    <circle
                      cx={nd.x}
                      cy={nd.y}
                      r="17"
                      fill={bad ? 'var(--danger-soft)' : 'var(--bg-elevated)'}
                      stroke={bad ? CRIMSON : NAVY}
                      strokeWidth={bad ? '2.2' : '1.7'}
                    />
                    <text x={nd.x} y={nd.y + 4.5} textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="700" fill="var(--text)">
                      {nd.val}
                    </text>
                    <text x={nd.x + 20} y={nd.y + 3} fontSize="9" fontFamily="monospace" fontWeight="700" fill={bad ? CRIMSON : 'var(--text-muted)'}>
                      bf={nd.bf > 0 ? `+${nd.bf}` : nd.bf}
                    </text>
                  </g>
                );
              })}
              {bstKeys.length === 0 && (
                <text x="260" y="145" textAnchor="middle" fontSize="12" fill="var(--text-muted)">
                  Drzewo jest puste — wstaw klucze lub wybierz gotowy przykład powyżej.
                </text>
              )}
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="card-subtle px-3 py-2">
                <span className="text-[var(--text-muted)]">Pre-order (VLR):</span> <strong>{bstData.trav.pre.join(', ') || '—'}</strong>
              </div>
              <div className="card-subtle px-3 py-2">
                <span className="text-[var(--text-muted)]">In-order (LVR — posortowane!):</span>{' '}
                <strong className="text-[var(--success)]">{bstData.trav.ino.join(', ') || '—'}</strong>
              </div>
              <div className="card-subtle px-3 py-2">
                <span className="text-[var(--text-muted)]">Post-order (LRV):</span> <strong>{bstData.trav.post.join(', ') || '—'}</strong>
              </div>
              <div className="card-subtle px-3 py-2">
                <span className="text-[var(--text-muted)]">BFS (poziomami):</span> <strong>{bstData.trav.bfs.join(', ') || '—'}</strong>
              </div>
            </div>

            <div className={`px-3 py-2 rounded border text-xs font-mono ${bstData.unbalanced.length > 0 ? 'bg-[var(--danger-soft)] border-[var(--danger)] text-[var(--danger)]' : 'bg-[var(--success-soft)] border-[var(--success)] text-[var(--success)]'}`}>
              {bstData.unbalanced.length > 0
                ? `Drzewo NIE spełnia warunku AVL! Naruszenia w węzłach: ${bstData.unbalanced.map((u) => `${u.val} (bf=${u.bf})`).join(', ')}.`
                : `Drzewo spełnia warunek AVL (wszystkie |bf| ≤ 1) ✓  Wysokość h = ${bstData.ann ? bstData.ann.h : 0}.`}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* TAB 3: NUMERICAL METHODS SOLVER (LECTURE 6)                        */}
      {/* ================================================================== */}
      {tab === 'numeric' && (
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif-heading text-lg font-bold m-0">
                  Porównanie metod rozwiązywania równań f(x) = 0 (Wykład 6)
                </h2>
                <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">{activePreset.note}</p>
              </div>
              <label className="flex items-center gap-2 text-xs font-mono">
                Dokładność ε = 10^{epsExp}
                <input type="range" min="-10" max="-2" step="1" value={epsExp} onChange={(e) => setEpsExp(Number(e.target.value))} className="w-24 accent-[var(--accent)]" />
              </label>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {NUM_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPresetId(p.id)}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono border cursor-pointer ${
                    presetId === p.id
                      ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)] font-semibold'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Summary 4-card comparator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              {[
                { id: 'bisection', name: 'Bisekcja (p = 1)', rows: solvers.bisection },
                { id: 'falsi', name: 'Regula falsi', rows: solvers.falsi },
                { id: 'secant', name: 'Siecznych (p ≈ 1,62)', rows: solvers.secant },
                { id: 'newton', name: 'Newton–Raphson (p = 2)', rows: solvers.newton },
              ].map((m) => {
                const last = m.rows[m.rows.length - 1];
                const act = detailMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDetailMethod(m.id)}
                    className={`p-3.5 rounded border text-left cursor-pointer transition-colors ${
                      act
                        ? 'bg-[var(--accent-soft)] border-[var(--accent)]'
                        : 'bg-[var(--bg-subtle)] border-[var(--border)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="font-bold text-[var(--text)]">{m.name}</div>
                    <div className="mt-1.5 text-[var(--accent-text)] font-bold text-sm tabular-nums">
                      {m.rows.length} iteracji
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-1 tabular-nums">
                      x ≈ {last ? last.x.toFixed(6) : '—'}
                    </div>
                    <div className="text-[10.5px] text-[var(--text-muted)] tabular-nums">
                      |f(x)| = {last ? Math.abs(last.fx).toExponential(1) : '—'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed iteration table for selected method */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-strong)] text-left text-[11px] uppercase text-[var(--text-muted)]">
                    <th className="py-2 pr-3">k</th>
                    <th className="py-2 px-3">{detailMethod === 'newton' ? <>x<sub>k−1</sub></> : <>a / x<sub>k−2</sub></>}</th>
                    <th className="py-2 px-3">{detailMethod === 'newton' ? <>f′(x<sub>k−1</sub>)</> : <>b / x<sub>k−1</sub></>}</th>
                    <th className="py-2 px-3">Nowe x<sub>k</sub></th>
                    <th className="py-2 px-3">f(x<sub>k</sub>)</th>
                    <th className="py-2 pl-3">Błąd kroku</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)] tabular-nums">
                  {activeDetailRows.slice(0, 15).map((row) => (
                    <tr key={row.k}>
                      <td className="py-1.5 pr-3 font-bold text-[var(--text)]">{row.k}</td>
                      <td className="py-1.5 px-3">{row.a.toFixed(5)}</td>
                      <td className="py-1.5 px-3">{row.b.toFixed(5)}</td>
                      <td className="py-1.5 px-3 font-bold text-[var(--accent-text)]">{row.x.toFixed(7)}</td>
                      <td className="py-1.5 px-3">{row.fx.toExponential(2)}</td>
                      <td className="py-1.5 pl-3">{row.err.toExponential(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Golden Section & Heron Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Golden Section Search */}
            <div className="card p-5 space-y-3">
              <h3 className="font-serif-heading text-base font-bold m-0">
                Metoda złotego podziału (minimum na [{activePreset.optA}, {activePreset.optB}])
              </h3>
              <p className="text-xs text-[var(--text-muted)] m-0">
                Stała α = (√5 − 1)/2 ≈ 0,618034 — po 1. kroku tylko 1 nowa ewaluacja f(x) na iterację!
              </p>
              <div className="text-xs font-mono px-3 py-2 rounded bg-[var(--success-soft)] border border-[var(--success)] text-[var(--success)]">
                Wynik po {solvers.golden.length} krokach: x<sub>min</sub> ≈{' '}
                <strong>
                  {solvers.golden.length
                    ? ((solvers.golden[solvers.golden.length - 1].a + solvers.golden[solvers.golden.length - 1].b) / 2).toFixed(6)
                    : '—'}
                </strong>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-mono border-collapse tabular-nums">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-left text-[var(--text-muted)]">
                      <th className="py-1 pr-2">k</th>
                      <th className="py-1 px-2">[a, b]</th>
                      <th className="py-1 px-2">x₁</th>
                      <th className="py-1 pl-2">x₂</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                    {solvers.golden.slice(0, 7).map((g) => (
                      <tr key={g.k}>
                        <td className="py-1 pr-2 font-bold">{g.k}</td>
                        <td className="py-1 px-2">[{g.a.toFixed(3)}, {g.b.toFixed(3)}]</td>
                        <td className="py-1 px-2">{g.x1.toFixed(4)}</td>
                        <td className="py-1 pl-2">{g.x2.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Heron's sqrt(S) */}
            <div className="card p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif-heading text-base font-bold m-0">
                  Algorytm Herona (babiloński) dla √S
                </h3>
                <label className="flex items-center gap-1.5 text-xs font-mono">
                  S =
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={heronS}
                    onChange={(e) => setHeronS(Math.max(0.01, Number(e.target.value) || 2))}
                    className="input-field !w-20 text-xs font-mono"
                  />
                </label>
              </div>
              <p className="text-xs text-[var(--text-muted)] m-0">
                x<sub>n+1</sub> = ½(x<sub>n</sub> + S/x<sub>n</sub>) — zbieżność kwadratowa (p = 2): liczba poprawnych cyfr podwaja się w każdym kroku!
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-mono border-collapse tabular-nums">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-left text-[var(--text-muted)]">
                      <th className="py-1 pr-2">k</th>
                      <th className="py-1 px-2">Przybliżenie x<sub>k</sub></th>
                      <th className="py-1 pl-2">Błąd |x<sub>k</sub> − √S|</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                    {heronSteps.out.map((h) => (
                      <tr key={h.k}>
                        <td className="py-1 pr-2 font-bold">{h.k}</td>
                        <td className="py-1 px-2 font-semibold text-[var(--text)]">{h.x.toFixed(10)}</td>
                        <td className="py-1 pl-2">{h.err.toExponential(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
