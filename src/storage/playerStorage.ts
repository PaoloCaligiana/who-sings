const PLAYER_KEY = "pc-who-sings-current-player";

export function saveCurrentPlayer(name: string) {
  localStorage.setItem(PLAYER_KEY, name);
}

export function getCurrentPlayer(): string | null {
  return localStorage.getItem(PLAYER_KEY);
}

export function clearPlayer() {
  localStorage.removeItem(PLAYER_KEY);
}
