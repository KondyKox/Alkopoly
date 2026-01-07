import type { Property } from "./TileProps";

export interface AlkopolyPlayer {
  id: string;
  name: string;
  pawn: Pawn;
  money: number;
  properties: Property[];
  position: number;
  jailed: boolean;
  rolled: boolean;

  buyProperty: (tile: Property) => void;
  payTax: (amount: number, toPlayer?: AlkopolyPlayer) => void;
}

export interface Pawn {
  name: string;
  imageSrc: string;
}
