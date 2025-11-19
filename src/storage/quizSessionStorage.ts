import type { QuizMode } from "../types";

const QUIZ_MODE_KEY = "who-sings-quiz-mode";
const INFINITE_PROGRESS_KEY = "who-sings-infinite-progress";

interface InfiniteProgress {
  score: number;
  streak: number;
  maxStreak: number; // Streak massima raggiunta
  round: number;
}

export function saveQuizMode(mode: QuizMode) {
  sessionStorage.setItem(QUIZ_MODE_KEY, mode);
}

export function getQuizMode(): QuizMode {
  return (sessionStorage.getItem(QUIZ_MODE_KEY) as QuizMode) || "normal";
}

export function clearQuizMode() {
  sessionStorage.removeItem(QUIZ_MODE_KEY);
}

export function saveInfiniteProgress(progress: InfiniteProgress) {
  sessionStorage.setItem(INFINITE_PROGRESS_KEY, JSON.stringify(progress));
}

export function getInfiniteProgress(): InfiniteProgress | null {
  const raw = sessionStorage.getItem(INFINITE_PROGRESS_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearInfiniteProgress() {
  sessionStorage.removeItem(INFINITE_PROGRESS_KEY);
}
