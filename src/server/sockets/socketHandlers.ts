import type { Server, Socket } from "socket.io";
import { addPlayer, alkopolyState, startGame } from "../game/gameState";
import type { Pawn } from "../../types/GameState";

export const handleAlkopolySocket = (io: Server, socket: Socket) => {
  socket.on("joinGame", ({ name, pawn }: { name: string; pawn: Pawn }) => {
    addPlayer(socket.id, name, pawn);
    console.log(`🟢 ${name} joined Alkopoly!`);

    io.emit("gameState", alkopolyState);
    // socket.broadcast.emit("playerJoined", { id: socket.id, name, pawn });
  });

  socket.on("startGame", () => {
    startGame();
    console.log("🎮 Game started!");
    io.emit("gameState", alkopolyState);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 ${socket.id} eliminated`);
    delete alkopolyState.players[socket.id];
    io.emit("gameState", alkopolyState);
  });
};
