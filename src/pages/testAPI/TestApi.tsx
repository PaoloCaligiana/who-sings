import { useEffect } from "react";
import { getOrLoadChartTracks } from "../../api/musixmatchService";
export default function TestApi() {
  useEffect(() => {

    getOrLoadChartTracks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Musixmatch API Tester</h2>
    </div>
  )
}
