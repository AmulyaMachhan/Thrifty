import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://thrifty-pink.vercel.app/",
      "/uploads": {
        target: "https://thrifty-pink.vercel.app/",
        changeOrigin: true,
      },
    },
  },
});
