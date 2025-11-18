import axios from "axios";

const API_KEY = import.meta.env.VITE_MUSIXMATCH_API_KEY;
const PROXY_URL = "/musix";

const musixmatchClient = axios.create({
  baseURL: PROXY_URL
});

musixmatchClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Musixmatch API error:", err.response?.data || err.message);
    throw err;
  }
);

export {API_KEY};
export default musixmatchClient;
