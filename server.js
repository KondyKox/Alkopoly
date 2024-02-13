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

  // Roll dice
  socket.on("rollDice", ({ playerId, steps }) => {
    const backendPlayerIds = Object.keys(backendPlayers);
    backendPlayerIds.forEach((backendPlayerId) => {
      if (playerId === backendPlayerId) {
        backendPlayers[backendPlayerId].position += steps;
        console.log(
          `${backendPlayers[backendPlayerId].name} poruszył się o ${steps} pól.`
        );

        io.emit("updatePlayers", backendPlayers);
      }
    });
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
