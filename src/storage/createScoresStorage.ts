import type { GameResult } from "../types";

const MAX_RESULTS = 500;

export function createScoreStorage(storageKey: string) {
  return {
    saveGameResult(result: GameResult) {
      const raw = localStorage.getItem(storageKey);
      const list: GameResult[] = raw ? JSON.parse(raw) : [];

      list.push(result);

      // Mantieni solo gli ultimi MAX_RESULTS
      if (list.length > MAX_RESULTS) {
        list.splice(0, list.length - MAX_RESULTS); // rimuove i più vecchi
      }

      localStorage.setItem(storageKey, JSON.stringify(list));
    },

    getAllResults(): GameResult[] {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    },

    getResultsForPlayer(playerName: string): GameResult[] {
      return this.getAllResults().filter((r) => r.playerName === playerName);
    },

    getMaxScore(): number {
      const results = this.getAllResults();
      if (results.length === 0) return 0;
      return Math.max(...results.map((r) => r.score));
    },

    clear() {
      localStorage.removeItem(storageKey);
    },
  };
}
