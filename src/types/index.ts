// types/index.ts
export type PlayerName = string;

export interface QuizCard {
  id: string;
  lyricLine: string;
  correctArtist: string;
  options: string[]; // 3 nomi, già mescolati
}

export interface GameResult {
  id: string;
  playerName: PlayerName;
  score: number;
  totalQuestions: number;
  createdAt: string; // ISO
}
