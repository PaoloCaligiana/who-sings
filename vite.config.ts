import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

const BASE_URL = "https://api.musixmatch.com/ws/1.1";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/musix": {
        target: BASE_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/musix/, ""),
      },
    },
  },
});
