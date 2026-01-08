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
  respect: boolean;
  incognito: number;
  kilof: boolean;
  sober: number;
  sigma: boolean;
  sniper: number;
  no_i_chuj: boolean;
  monkey: number;

  buyProperty: (tile: Property) => void;
  payTax: (amount: number, toPlayer?: AlkopolyPlayer) => void;
  move: (amount: number, tileLenght: number) => void;
  rudyChuj: () => void;
}

export interface Pawn {
  name: string;
  imageSrc: string;
}
