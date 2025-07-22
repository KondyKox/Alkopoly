import type { AlkopolyPlayer, GameState, Pawn } from "../../types/GameState";
import { generateTiles } from "../../utils/generateTiles";

export const alkopolyState: GameState = {
  players: {},
  currentPlayerId: "",
  gameStarted: false,
  tiles: generateTiles(),
};

// Add new player
export const addPlayer = (id: string, name: string, pawn: Pawn) => {
  if (alkopolyState.players[id]) return; // exists

  const newPlayer: AlkopolyPlayer = {
    id,
    name,
    pawn,
    money: 2000,
    properties: [],
    position: 0,
    jailed: false,
  };

  alkopolyState.players[id] = newPlayer;

  if (!alkopolyState.currentPlayerId) alkopolyState.currentPlayerId = id;
};

// Start game
export const startGame = () => {
  alkopolyState.gameStarted = true;
};
