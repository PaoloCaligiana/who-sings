// types/index.ts
export type PlayerName = string;

export interface QuizCard {
  lyricLine: string;
  correctArtist: string;
  options: string[]; // 3 nomi, già mescolati
}

export interface GameResult {
  playerName: PlayerName;
  score: number;
  totalQuestions: number;
  createdAt: string; // ISO
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