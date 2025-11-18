import { globalScoresStorage } from "../storage/globalScoresStorage";
import type { LeaderboardStrategy } from "./leaderboardStrategies";

export function getLeaderboard(strategy: LeaderboardStrategy, limit = 10) {
  const results = globalScoresStorage.getAllResults();
  const computed = strategy.compute(results);
  return computed.slice(0, limit);
}
