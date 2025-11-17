import type { GameResult } from "../types";

export interface LeaderboardStrategy {
  name: string;
  compute: (results: GameResult[]) => LeaderboardEntry[];
}

export interface LeaderboardEntry {
  player: string;
  bestScore: number;
}

// Strategia 1 – Miglior punteggio per giocatore
export const bestScorePerPlayer: LeaderboardStrategy = {
  name: "best-per-player",
  compute(results) {
    const byPlayer = new Map<string, number>();

    results.forEach(r => {
      const current = byPlayer.get(r.playerName) ?? 0;
      byPlayer.set(r.playerName, Math.max(current, r.score));
    });

    return Array.from(byPlayer.entries())
      .map(([player, score]) => ({ player, bestScore: score }))
      .sort((a, b) => b.bestScore - a.bestScore);
  }
};


// Strategia 2 – Top 3 risultati per ogni giocatore
export const top3PerPlayer: LeaderboardStrategy = {
  name: "top-3-per-player",
  compute(results) {
    const byPlayer = new Map<string, GameResult[]>();

    results.forEach(r => {
      if (!byPlayer.has(r.playerName)) byPlayer.set(r.playerName, []);
      byPlayer.get(r.playerName)!.push(r);
    });

    const entries = Array.from(byPlayer.entries()).flatMap(([player, scores]) =>
      scores
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(r => ({ player, bestScore: r.score }))
    );

    return entries.sort((a, b) => b.bestScore - a.bestScore);
  }
};
