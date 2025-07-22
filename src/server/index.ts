import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { handleAlkopolySocket } from "./sockets/socketHandlers";

const vite_url = process.env.VITE_URL || "http://localhost:5173";

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: vite_url, methods: ["GET", "POST"] }));

const io = new Server(server, {
  cors: {
    origin: vite_url,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🟢 New connection: ${socket.id}`);

  handleAlkopolySocket(io, socket);

  socket.on("disconnect", () => {
    console.log(`🔴 Disconnect: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server working on http://localhost:${PORT}`);
});
