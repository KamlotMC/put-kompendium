async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Błąd serwera (${res.status})`);
  }
  return data;
}

import { api as staticApi } from './staticApi.js';

const serverApi = {
  getOverview: () => request('/api/overview'),
  getSubjects: () => request('/api/subjects'),
  getSubject: (slug) => request(`/api/subjects/${encodeURIComponent(slug)}`),
  getChapter: (id) => request(`/api/chapters/${encodeURIComponent(id)}`),
  updateChapterProgress: (id, body) =>
    request(`/api/chapters/${encodeURIComponent(id)}/progress`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  getFlashcards: (slug, params = {}) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
    });
    const q = qs.toString();
    return request(`/api/subjects/${encodeURIComponent(slug)}/flashcards${q ? `?${q}` : ''}`);
  },
  createFlashcard: (slug, body) =>
    request(`/api/subjects/${encodeURIComponent(slug)}/flashcards`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  deleteFlashcard: (id) =>
    request(`/api/flashcards/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  reviewFlashcard: (id, rating) =>
    request(`/api/flashcards/${encodeURIComponent(id)}/review`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    }),

  getQuizzes: (slug, params = {}) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
    });
    const q = qs.toString();
    return request(`/api/subjects/${encodeURIComponent(slug)}/quizzes${q ? `?${q}` : ''}`);
  },
  submitAttempt: (slug, body) =>
    request(`/api/subjects/${encodeURIComponent(slug)}/attempts`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  getAttempts: (slug) => request(`/api/subjects/${encodeURIComponent(slug)}/attempts`),

  getExamTopics: (slug) => request(`/api/subjects/${encodeURIComponent(slug)}/exam-topics`),
  updateExamTopicProgress: (id, body) =>
    request(`/api/exam-topics/${encodeURIComponent(id)}/progress`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  getGlossary: (slug) => request(`/api/subjects/${encodeURIComponent(slug)}/glossary`),
  search: (q) => request(`/api/search?q=${encodeURIComponent(q)}`),

  generateSubnet: (difficulty = 'exam') =>
    request(`/api/subnet/generate?difficulty=${encodeURIComponent(difficulty)}`),
  checkSubnet: (body) =>
    request('/api/subnet/check', { method: 'POST', body: JSON.stringify(body) }),
  analyzeSubnet: (ip, mask) =>
    request('/api/subnet/analyze', { method: 'POST', body: JSON.stringify({ ip, mask }) }),
  getSubnetStats: () => request('/api/subnet/stats'),

  getBackup: () => request('/api/backup'),
  importBackup: (payload) =>
    request('/api/backup/import', { method: 'POST', body: JSON.stringify(payload) }),
};

export const api = import.meta.env.VITE_STATIC ? staticApi : serverApi;
