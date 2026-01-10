import type { AlkopolyPlayer } from "./PlayerProps";

export interface TileProps {
  id: number;
  name: string;
  type: TileType;
  imageSrc: string;
  owner: AlkopolyPlayer | null;
  description: string;
  players: AlkopolyPlayer[];
  price?: number; // buying property
  tax?: number;

  getAlcohols?: () => AlcoholProps[];
  getTotalTax?: () => number;
  addAlcohol: (buyer: AlkopolyPlayer) => void;
  destroyAlcohol?: () => void;
  hasVodka?: () => boolean;
}

export type TileFromJSON = Omit<TileProps, "id">;

export interface BoardProps {
  tiles: TileProps[];
}

export type TileType =
  | "start"
  | "property"
  | "fine"
  | "chance"
  | "jail"
  | "reward";

export interface Property extends TileProps {
  type: "property";
  alcohol: AlcoholProps[];
}

export interface AlcoholProps {
  type: "beer" | "vodka";
  taxBonus: number;
  cost: number;
  imageSrc: string;
}
