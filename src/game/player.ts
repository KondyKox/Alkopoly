import type { AlkopolyPlayer, Pawn } from "../types/PlayerProps";
import type { Property } from "../types/TileProps";

const START_MONEY = 2000;

export default class Player implements AlkopolyPlayer {
  id: string;
  name: string;
  pawn: Pawn;
  money: number = START_MONEY;
  properties: Property[] = [];
  position: number = 0;
  jailed: boolean = false;

  constructor(id: string, name: string, pawn: Pawn) {
    this.id = id;
    this.name = name;
    this.pawn = pawn;
  }
}
