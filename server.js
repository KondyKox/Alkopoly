import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// CORS
app.use(cors());

// Backend Players
const backendPlayers = {};
let backendPlayerIds;
let currentBackendPlayer;

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

    backendPlayerIds = Object.keys(backendPlayers);
    currentBackendPlayer = backendPlayerIds[0];

    io.emit("gameStarted");
  });

  // Roll dice
  socket.on("rollDice", ({ playerId, steps }) => {
    if (playerId === currentBackendPlayer) {
      backendPlayers[currentBackendPlayer].position += steps;
      console.log(
        `${backendPlayers[currentBackendPlayer].name} poruszył się o ${steps} pól.`
      );

      // Change current player
      const currentPlayerIdex = backendPlayerIds.indexOf(playerId);
      const nextPlayerIndex = (currentPlayerIdex + 1) % backendPlayerIds.length;
      const nextPlayerId = backendPlayerIds[nextPlayerIndex];

      currentBackendPlayer = nextPlayerId;

      io.emit("updatePlayers", backendPlayers);
    }
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
