import type { GameResult } from "../types";

const SCORES_KEY = "who-sings-scores";

export function saveGameResult(result: GameResult) {
  const raw = localStorage.getItem(SCORES_KEY);
  const list: GameResult[] = raw ? JSON.parse(raw) : [];
  list.push(result);
  localStorage.setItem(SCORES_KEY, JSON.stringify(list));
}

export function getAllResults(): GameResult[] {
  const raw = localStorage.getItem(SCORES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getResultsForPlayer(playerName: string): GameResult[] {
  return getAllResults().filter((r) => r.playerName === playerName);
}
