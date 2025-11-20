import type { GameResult } from "../types";

export function createScoreStorage(storageKey: string) {
  return {
    saveGameResult(result: GameResult) {
      const raw = localStorage.getItem(storageKey);
      const list: GameResult[] = raw ? JSON.parse(raw) : [];
      list.push(result);
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
