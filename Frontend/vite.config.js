import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotli", // or 'gzip'
      ext: ".js", // File extensions to compress
      threshold: 1024, // Minimum file size (in bytes) to compress
      deleteOriginFile: false, // Keep the original files after compression
      verbose: true, // Output compression information to console
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
