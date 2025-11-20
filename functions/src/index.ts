import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import axios from "axios";

// definisci il secret
const MUSIXMATCH_KEY = defineSecret("MUSIXMATCH_KEY");

const BASE_URL = "https://api.musixmatch.com/ws/1.1";

export const musixmatch = onRequest(
  {
    cors: true,
    secrets: [MUSIXMATCH_KEY], // <-- IMPORTANTISSIMO
    region: "us-central1",
    timeoutSeconds: 15,
  },
  async (req, res) => {
    const endpoint = req.query.endpoint as string;
    const params = { ...req.query };
    delete params.endpoint;

    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
        params: {
          apikey: MUSIXMATCH_KEY.value(), // <-- il valore del secret
          ...params,
        },
      });

      res.json(response.data);
    } catch (err: any) {
      console.error("Musixmatch API Error:", err.response?.data || err.message);
      res.status(500).json({ error: err.message });
    }
  }
);
