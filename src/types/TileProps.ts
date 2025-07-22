import type { AlkopolyPlayer } from "./GameState";

export interface TileProps {
  id: number;
  name: string;
  type: TileType;
  imageSrc: string;
  owner: AlkopolyPlayer | null;
  description: string;
  price?: number; // buying property
  tax?: number;
}

export type TileFromJSON = Omit<TileProps, "id">;

export type TileType =
  | "start"
  | "property"
  | "fine"
  | "chance"
  | "jail"
  | "reward";

export interface Property extends TileProps {
  type: "property";
  alcohol: Alcohol[];
}

export interface Alcohol {
  type: "beer" | "vodka";
  taxBonus: number;
}
