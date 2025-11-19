import type { ChartTrackEntry } from "../types";

const CHART_KEY = "who-sings-chart-tracks";

export function saveChartTracks(country: string, chartTracks: ChartTrackEntry[]) {
  const raw = localStorage.getItem(CHART_KEY);
  const map: Record<string, ChartTrackEntry[]> = raw ? JSON.parse(raw) : {};

  map[country] = chartTracks;

  localStorage.setItem(CHART_KEY, JSON.stringify(map));
}

export function loadChartTracks(country: string): ChartTrackEntry[] | null {
  const raw = localStorage.getItem(CHART_KEY);
  if (!raw) return null;

  const map: Record<string, ChartTrackEntry[]> = JSON.parse(raw);

  return map[country] ?? null;
}
