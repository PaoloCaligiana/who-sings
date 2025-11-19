import { useEffect, useState } from "react";
import { getOrLoadChartTracks } from "../../api/musixmatchService";
import type { ChartTrackEntry } from "../../types";
import { fetchLyricsByCommontrack } from "../../api/musixMatchApi";
export default function TestApi() {
  
  const [chartTracks, setChartTracks] = useState<ChartTrackEntry[]>([]);
  const [lyrics, setLyrics] = useState<string>("");
  useEffect(() => {

    getOrLoadChartTracks().then(tracks => setChartTracks(tracks));
  }, []);

  useEffect(() => {
    if (chartTracks.length === 0) return; // Attendi che le tracce siano caricate

    // Prendi la prima traccia e simula il recupero della prima riga di testo  
    const firstTrack = chartTracks[0];
    fetchLyricsByCommontrack(firstTrack.commontrack_id).then(lyrics => {
      if (lyrics ) {
        setLyrics(lyrics);
      } else {
        setLyrics("No lyrics found.");
      }
    });
  }, [chartTracks]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Musixmatch API Tester</h2>
      <p>{lyrics}</p>
    </div>
  )
}
