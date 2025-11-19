// musixmatchService.ts

import { getCountryByLang } from "../i18n/utils";
import { loadChartTracks, saveChartTracks } from "../storage/chartTrucksStorage";
import { getSavedLanguage } from "../storage/languageStorage";
import type { ChartTrackEntry, MusixmatchTrackApiItem } from "../types";
import { fetchChartTracks } from "./musixMatchApi";

/** Ottieni le tracce più popolari per paese (cache locale → API → salva cache) */
export async function getOrLoadChartTracks(countryCode?: string): Promise<ChartTrackEntry[]> {
  
  /* Tracce piu' popolari per paese in base al codice paese fornito o alla lingua selezionata  */
  const country =  countryCode || getCountryByLang(getSavedLanguage());
  const cached = loadChartTracks(country);    
  if (cached && cached.length > 0) return cached;

  const response = await fetchChartTracks(country);

  const parsed: ChartTrackEntry[] = response.map((row: MusixmatchTrackApiItem) => {
    const track = row.track;

    const genreName = track?.primary_genres?.music_genre_list?.[0]?.music_genre?.music_genre_name || "Unknown";

    return {
      commontrack_id: track.commontrack_id,
      artist_name: track.artist_name,
      track_name: track.track_name,
      music_genre_name: genreName,
    };
  });

  saveChartTracks(country, parsed);
  return parsed;
}
