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

    clear() {
      localStorage.removeItem(storageKey);
    },
  };
}
