import type { ChartTrackEntry } from "../types";

interface CachedChartData {
  tracks: ChartTrackEntry[];
  timestamp: number;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 ore
const CHART_KEY = "pc-who-sings-chart-tracks";

export function saveChartTracks(country: string, chartTracks: ChartTrackEntry[]) {
  const raw = localStorage.getItem(CHART_KEY);
  const map: Record<string, CachedChartData> = raw ? JSON.parse(raw) : {};

  map[country] = {
    tracks: chartTracks,
    timestamp: Date.now(),
  };

  localStorage.setItem(CHART_KEY, JSON.stringify(map));
}

export function loadChartTracks(country: string): ChartTrackEntry[] | null {
  const raw = localStorage.getItem(CHART_KEY);
  if (!raw) return null;

  const map: Record<string, CachedChartData> = JSON.parse(raw);
  const cached = map[country];

  if (!cached) return null;

  // Verifica se la cache è scaduta
  const isExpired = Date.now() - cached.timestamp > CACHE_TTL_MS;
  if (isExpired) return null;

  return cached.tracks;
}
