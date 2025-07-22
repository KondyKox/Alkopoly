import type { Server, Socket } from "socket.io";
import type { Pawn } from "../../types/GameState";
import type { Game } from "../game/Game";

export class SocketHandler {
  private io: Server;
  private game: Game;

  constructor(io: Server, game: Game) {
    this.io = io;
    this.game = game;
  }

  public handleConnection(socket: Socket) {
    console.log(`🟢 New connection: ${socket.id}`);

    socket.on("joinGame", ({ name, pawn }: { name: string; pawn: Pawn }) => {
      this.game.addPlayer(socket.id, name, pawn);
      console.log(`🟢 ${name} joined the game`);

      this.io.emit("gameState", this.game.getState());
    });

    socket.on("startGame", () => {
      this.game.startGame();
      console.log("🎮 Game started!");
      this.io.emit("gameState", this.game.getState());
    });

    socket.on("disconnect", () => {
      console.log(`🔴 ${socket.id} disconnected`);
      this.game.removePlayer(socket.id);
      this.io.emit("gameState", this.game.getState());
    });
  }
}
