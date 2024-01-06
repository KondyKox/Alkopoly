import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import pawnsData from "./src/data/pawnsData.json" assert { type: "json" };

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Port for server
const PORT = 3001;

// CORS
app.use(cors());

// Players array
const players = {};

// Server connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  players[socket.id] = { id: socket.id, name: null, pawn: null };

  const registeredPlayers = Object.values(players).map(({ name, pawn }) => ({
    name,
    pawn,
  }));

  io.to(socket.id).emit("registeredPlayers", registeredPlayers);
  io.emit("newPlayer", players[socket.id]);

  // Register player
  socket.on("registerPlayer", (data) => {
    const oldName = players[socket.id].name;

    players[socket.id].name = data.name;
    players[socket.id].pawn = data.pawn;

    io.emit("newPlayer", players[socket.id]);

    if (oldName) io.emit("playerDisconnected", socket.id);
  });

  // Select pawn
  socket.on("selectPawn", ({ playerID, selectedPawn }) => {
    players[playerID].pawn = pawnsData.find((pawn) => pawn.id === selectedPawn);
    console.log(selectedPawn)
    io.emit("updatePlayer", players[playerID]);
  });

  // Disconnect player
  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
