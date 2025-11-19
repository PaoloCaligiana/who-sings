import type { Country } from "../i18n/constants";
import type { ChartTrackEntry, QuizCard } from "../types";
import { fetchLyricsByCommontrack } from "./musixMatchApi";
import { getOrLoadChartTracks } from "./musixmatchService";


const QUIZ_OPTIONS_COUNT = 3; // Numero di opzioni per domanda
const MAX_ATTEMPT_MULTIPLIER = 5; // Tentativi massimi = n * multiplier

/* -------------------------
    UTILS
--------------------------- */

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function cleanLyrics(raw: string) {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .filter((l) => !l.startsWith("*"))
    .filter((l) => !l.includes("Lorem ipsum"))
    .filter((l) => !l.includes("This Lyrics is NOT available"))
    .filter((l) => l.split(" ").length >= 3);
}

function filterTracksByGenre(tracks: ChartTrackEntry[], genre?: string): ChartTrackEntry[] {
  if (!genre) return tracks;
  return tracks.filter((t) => t.music_genre_name?.toLowerCase() === genre.toLowerCase());
}

function filterTracksByArtist(tracks: ChartTrackEntry[], artist?: string): ChartTrackEntry[] {
  if (!artist) return tracks;
  return tracks.filter((t) => t.artist_name?.toLowerCase() === artist.toLowerCase());
}

/* -------------------------
   🎯 generateQuizCard()
--------------------------- */

export async function generateQuizCard(artistName?: string, musicGenre?: string, country?: Country): Promise<QuizCard | null> {
  const tracksData = await getOrLoadChartTracks(country);
  if (!tracksData.length) return null;

  // if musicGenre is provided, filter tracks by music_genre_name
  const filteredTracks = filterTracksByGenre(tracksData, musicGenre);
  // if artistName is provided, filter tracks by artist_name
  const finalTracks = filterTracksByArtist(filteredTracks, artistName);

  // Not enough tracks
  if (finalTracks.length < QUIZ_OPTIONS_COUNT) return null;

  // pick random tracks from finalTracks
  const randomTracks = shuffle<ChartTrackEntry>(finalTracks).slice(0, QUIZ_OPTIONS_COUNT);

  const options = randomTracks.map((t) => t.artist_name);
  const correctTrack = randomTracks[0];

  // Load lyrics
  const lyrics = await fetchLyricsByCommontrack(correctTrack.commontrack_id);
  if (!lyrics) return null;

  const lines = cleanLyrics(lyrics);
  if (lines.length < 2) return null;

  const lyricLine: string = pickRandom<string>(lines);

  return {
    lyricLine,
    correctArtist: correctTrack.artist_name,
    options,
  };
}

/* -------------------------
   ⚡ preloadQuizCards() with safe parallelism
--------------------------- */

export async function preloadQuizCards(n: number, artistName?: string, musicGenre?: string, country?: Country): Promise<QuizCard[]> {
  const cards: QuizCard[] = [];

  const MAX_ATTEMPTS = n * MAX_ATTEMPT_MULTIPLIER;
  let attempts = 0;

  while (cards.length < n && attempts < MAX_ATTEMPTS) {
    attempts++;

    const card = await generateQuizCard(artistName, musicGenre, country);
    if (card) cards.push(card);
  }
  // Se non si è riusciti a generare nemmeno una domanda, è un errore critico
  if (cards.length === 0) {
    throw new Error("Failed to generate any quiz questions. Check API connectivity or data availability.");
  }

  // Warning se non si è raggiunto il target richiesto
  if (cards.length < n) {
    console.warn(`Generated only ${cards.length}/${n} questions after ${attempts} attempts`);
  }

  return cards;
}
