import type { AlcoholProps } from "../types/TileProps";

export default class Alcohol implements AlcoholProps {
  type: "beer" | "vodka";
  taxBonus: number;
  cost: number;
  imageSrc: string;

  constructor(type: "beer" | "vodka") {
    this.type = type;

    switch (type) {
      case "beer":
        this.taxBonus = 50;
        this.cost = 100;
        this.imageSrc = "./alkopoly/game_pieces/alkohol/beer.png";
        break;
      case "vodka":
        this.taxBonus = 300;
        this.cost = 200;
        this.imageSrc = "./alkopoly/game_pieces/alkohol/vodka.png";
        break;
    }

    console.log(
      `Postawiono ${this.type} – podatek rośnie o ${this.taxBonus} zł. Zdrowie! 🍻`
    );
  }
}
