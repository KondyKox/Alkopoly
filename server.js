import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {pingInterval: 2000, pingTimeout: 5000});

// CORS
app.use(cors());

// Players
const players = {};

// Connection with server
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  players[socket.id] = {
    name: "Kondi",
    pawn: Math.floor(Math.random() * 12),
    position: 0,
  };

  io.emit("updatePlayers", players);

  // Disconnect player
  socket.on("disconnect", (reason) => {
    console.log(reason);
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
