import musixmatchClient, { API_KEY } from "./musixmatchClient";

export async function fetchChartTracks(country: string) {
  const res = await musixmatchClient.get("/chart.tracks.get", {
    params: {
      apikey: API_KEY,
      country,
      page: 1,
      f_has_lyrics: 1,
      page_size: 100
    }
  });

  return res.data.message.body.track_list ?? [];
}

export async function fetchLyricsByCommontrack(commontrackId: number) {
  try {
    const res = await musixmatchClient.get("/track.lyrics.get", {
      params: {
        apikey: API_KEY,
        commontrack_id: commontrackId
      }
    });

    const lyrics = res.data?.message?.body?.lyrics;
    
    if (!lyrics || !lyrics.lyrics_body) {
      return null;
    }

    return lyrics.lyrics_body;
  } catch (error) {
    console.warn(`Failed to fetch lyrics for commontrack_id ${commontrackId}:`, error);
    return null;
  }
}
