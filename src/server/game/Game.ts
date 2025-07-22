import type { AlkopolyPlayer, GameState, Pawn } from "../../types/GameState";
import { generateTiles } from "../../utils/generateTiles";

export class Game {
  private state: GameState;

  constructor() {
    this.state = {
      players: {},
      currentPlayerId: "",
      gameStarted: false,
      tiles: generateTiles(),
    };
  }

  public addPlayer(id: string, name: string, pawn: Pawn) {
    if (this.state.players[id]) return;

    const newPlayer: AlkopolyPlayer = {
      id,
      name,
      pawn,
      money: 2000,
      properties: [],
      position: 0,
      jailed: false,
    };

    this.state.players[id] = newPlayer;

    if (!this.state.currentPlayerId) {
      this.state.currentPlayerId = id;
    }
  }

  public startGame() {
    this.state.gameStarted = true;
  }

  public getState() {
    return this.state;
  }

  public removePlayer(id: string) {
    delete this.state.players[id];
    if (this.state.currentPlayerId === id) {
      this.state.currentPlayerId = Object.keys(this.state.players)[0] || "";
    }
  }
}
