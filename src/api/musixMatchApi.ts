import musixmatchClient, { API_KEY } from "./musixmatchClient";

export async function fetchChartTracks(country: string) {
  const res = await musixmatchClient.get("/chart.tracks.get", {
    params: {
      apikey: API_KEY,
      country,
      page: 1,
      page_size: 100
    }
  });

  return res.data.message.body.track_list ?? [];
}

export async function fetchLyricsByCommontrack(commontrackId: number) {
  const res = await musixmatchClient.get("/track.lyrics.get", {
    params: {
      apikey: API_KEY,
      commontrack_id: commontrackId
    }
  });

  return res.data.message.body.lyrics.lyrics_body ?? null;
}
