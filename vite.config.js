import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { createServer } from "vite";
// import { Server } from "socket.io";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "https://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
