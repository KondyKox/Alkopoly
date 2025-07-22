import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { Game } from "./game/Game";
import { SocketHandler } from "./sockets/SocketHandler";

const VITE_URL = process.env.VITE_URL || "http://localhost:5173";
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: VITE_URL, methods: ["GET", "POST"] }));

const io = new Server(server, {
  cors: {
    origin: VITE_URL,
    methods: ["GET", "POST"],
  },
});

const game = new Game();
const socketHandler = new SocketHandler(io, game);

io.on("connection", (socket) => {
  console.log(`🟢 New connection: ${socket.id}`);

  socketHandler.handleConnection(socket);

  socket.on("disconnect", () => {
    console.log(`🔴 Disconnect: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server working on http://localhost:${PORT}`);
});
