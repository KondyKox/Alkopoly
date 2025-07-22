import type { Property, TileProps } from "./TileProps";

export interface GameState {
  players: Record<string, AlkopolyPlayer>;
  currentPlayerId: string;
  gameStarted: boolean;
  tiles: TileProps[];
}

export interface AlkopolyPlayer {
  id: string;
  name: string;
  pawn: Pawn;
  money: number;
  properties: Property[];
  position: number;
  jailed: boolean;
}

export interface Pawn {
  name: string;
  imageSrc: string;
}
