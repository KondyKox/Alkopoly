import type { Property } from "./TileProps";

export interface AlkopolyPlayer {
  id: string;
  name: string;
  pawn: Pawn;
  money: number;
  properties: Property[];
  position: number;
  jailed: boolean;

  buyProperty: (tile: Property) => void;
}

export interface Pawn {
  name: string;
  imageSrc: string;
}
