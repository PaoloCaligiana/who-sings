import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE;

const musixmatchClient = axios.create({
  baseURL: BASE
});

musixmatchClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Musixmatch API error:", err.response?.data || err.message);
    throw err;
  }
);

export default musixmatchClient;
