import { currentScoresStorage } from "./currentScoresStorage";

const PLAYER_KEY = "who-sings-current-player";

export function saveCurrentPlayer(name: string) {
  localStorage.setItem(PLAYER_KEY, name);
}

export function getCurrentPlayer(): string | null {
  return localStorage.getItem(PLAYER_KEY);
}

export function logoutPlayer() {
  localStorage.removeItem(PLAYER_KEY);
  currentScoresStorage.clear();
}
