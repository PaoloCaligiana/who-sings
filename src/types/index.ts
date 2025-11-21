// types/index.ts
export type PlayerName = string;
export type QuizMode = "normal" | "infinite";

export interface QuizCard {
  lyricLine: string;
  correctArtist: string;
  options: string[]; // 3 nomi, già mescolati
  music_genre_name: string; // genere musicale della canzone
}

export interface GameResult {
  playerName: PlayerName;
  score: number;
  totalQuestions: number;
  createdAt: string; // ISO
  mode?: QuizMode; // normal | infinite
  rounds?: number; // numero di round completati (solo per infinite)
  maxStreak?: number; // streak massima raggiunta
  mainGenre?: string; // genere musicale più indovinato nella partita
}

export interface ChartTrackEntry {
  commontrack_id: number;
  artist_name: string;
  track_name: string;
  music_genre_name: string;
}

export interface MusixmatchTrackApiItem {
  track: {
    commontrack_id: number;
    track_name: string;
    artist_name: string;
    primary_genres?: {
      music_genre_list?: {
        music_genre: {
          music_genre_name: string;
        };
      }[];
    };
  };
}
