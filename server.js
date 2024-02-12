import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

// CORS
app.use(cors());

// Backend Players
const backendPlayers = {};

// Connection with server
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Submit user
  socket.on("initLobby", (username, pawn) => {
    backendPlayers[socket.id] = {
      name: username,
      pawn: pawn,
      position: 1,
    };

    io.emit("updatePlayers", backendPlayers);
  });

  // Start game
  socket.on("startGame", (gameState) => {
    console.log("Gra wystartowała!");
    gameState.isGameStarted = true;
    io.emit("gameStarted");
  });

  // Disconnect player
  socket.on("disconnect", (reason) => {
    console.log(reason);
    delete backendPlayers[socket.id];
    io.emit("updatePlayers", backendPlayers);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
