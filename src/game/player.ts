import type { AlkopolyPlayer, Pawn } from "../types/PlayerProps";
import type { Property } from "../types/TileProps";

const START_MONEY = 2000;

export default class Player implements AlkopolyPlayer {
  id: string;
  name: string;
  pawn: Pawn;
  money: number = START_MONEY;
  properties: Property[] = [];
  position: number = 1; // First tile on board has id=1
  jailed: boolean = false;
  rolled: boolean = false;

  constructor(id: string, name: string, pawn: Pawn) {
    this.id = id;
    this.name = name;
    this.pawn = pawn;
  }

  buyProperty(tile: Property): void {
    if (!tile.price) return;

    if (this.money <= tile.price) {
      alert("BIEDAK JESTEŚ!!!");
      return;
    }

    this.money -= tile.price;
    this.properties.push(tile);
    tile.owner = this;

    console.log(`${this.name} kupił ${tile.name} za ${tile.price}`);
  }

  payTax(amount: number, toPlayer?: AlkopolyPlayer): void {
    if (this.money <= 0) {
      alert(`${this.name} TO BIEDAK JEBANY 😂😂😂`);
      this.jailed = true;
      return;
    }

    this.money -= amount;
    if (toPlayer) toPlayer.money += amount;
    console.log(`${this.name} płaci podatek.`);
  }
}
