import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createServer } from "vite";
import ws from "ws";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ws": {
        target: "https://localhost:3001",
        ws: true,
      },
    },
  },
  configureServer: ({ app }) => {
    const server = createServer();

    const wss = new ws.Server({ noServer: true });

    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        
      });
    });

    server.on("upgrade", (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    });

    app.use((req, res, next) => {
      req.wss = wss;
      next();
    });
  },
});
