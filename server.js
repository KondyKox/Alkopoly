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
let backendGameState;

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
    backendGameState = gameState;

    backendPlayerIds = Object.keys(backendPlayers);
    currentBackendPlayer = backendPlayerIds[0];

    io.emit("gameStarted");
  });

  // Roll dice
  socket.on("rollDice", ({ playerId, steps }) => {
    if (playerId === currentBackendPlayer) {
      backendPlayers[playerId].position += steps;
      console.log(
        `${backendPlayers[playerId].name} poruszył się o ${steps} pól.`
      );

      // Change current player
      const currentPlayerIndex = backendPlayerIds.indexOf(playerId);
      const nextPlayerIndex =
        (currentPlayerIndex + 1) % backendPlayerIds.length;
      const nextPlayerId = backendPlayerIds[nextPlayerIndex];

      currentBackendPlayer = backendPlayers[nextPlayerId];

      console.log(`Teraz kolej na ${currentBackendPlayer.name}`);
      io.emit("updatePlayers", backendPlayers);
      io.emit("updateCurrentPlayer", currentBackendPlayer);
    }
  });

  // Update current player
  socket.on("updateCurrentPlayer", ({ gameState, currentPlayerId }) => {
    backendGameState = gameState;
    gameState.currentPlayerId = currentPlayerId;
    currentBackendPlayer = backendPlayers[currentPlayerId];

    console.log(currentPlayerId);
    io.emit("updateGameState", backendGameState);
  });

  // // Update reward
  // socket.on("updateReward", (reward) => {
  //   gameState.reward = reward;

  // });

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
