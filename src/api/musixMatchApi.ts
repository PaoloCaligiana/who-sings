import musixmatchClient from "./musixmatchClient";

export async function fetchChartTracks(country: string) {
  const res = await musixmatchClient.get("/", {
    params: {
      endpoint: "chart.tracks.get",
      country,
      page: 1,
      f_has_lyrics: 1,
      page_size: 100
    }
  });

  return res.data?.message?.body?.track_list ?? [];
}

export async function fetchLyricsByCommontrack(commontrackId: number) {
  const res = await musixmatchClient.get("/", {
    params: {
      endpoint: "track.lyrics.get",
      commontrack_id: commontrackId,
    }
  });

  const lyrics = res.data?.message?.body?.lyrics;
  return lyrics?.lyrics_body ?? null;
}
