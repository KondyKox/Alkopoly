import type { AlkopolyPlayer } from "../types/PlayerProps";
import type { AlcoholProps, TileProps, TileType } from "../types/TileProps";
import Alcohol from "./alcohol";

export default class Property implements TileProps {
  id: number;
  name: string;
  type: TileType = "property";
  imageSrc: string;
  owner: AlkopolyPlayer | null = null;
  description: string;
  players: AlkopolyPlayer[] = [];
  price: number; // buying property
  tax: number;
  private alcohols: AlcoholProps[] = [];
  private maxBeers: number = 4;

  constructor(props: Omit<TileProps, "type"> & { price: number; tax: number }) {
    this.id = props.id;
    this.name = props.name;
    this.imageSrc = props.imageSrc;
    this.description = props.description;
    this.price = props.price;
    this.tax = props.tax;
  }

  getAlcohols(): AlcoholProps[] {
    return [...this.alcohols];
  }

  getTotalTax(): number {
    const bonus = this.alcohols.reduce((sum, a) => sum + a.taxBonus, 0);
    return this.tax + bonus;
  }

  addAlcohol(buyer: AlkopolyPlayer): void {
    let alcoType: "beer" | "vodka";
    let message = "";

    const hasVodka = this.alcohols.some((a) => a.type === "vodka");
    if (hasVodka) {
      console.log(`Na ${this.name} już stoi wódka.`);
      return;
    }

    if (this.alcohols.length >= this.maxBeers) {
      const oldBeers = this.alcohols.length;
      this.alcohols = [];
      alcoType = "vodka";
      message = `Wyrzucono ${oldBeers} piw(ka) z ${this.name} – miejsce na wódkę!`;
    } else {
      alcoType = "beer";
      message = `Dodano piwo na polu ${this.name}.`;
    }

    const alcohol = new Alcohol(alcoType);

    if (buyer.money < alcohol.cost) {
      console.log(
        `Bieda, kondy – ${buyer.name} nie stać na ${alcoType}. No i chuj.`
      );
      return;
    }

    buyer.buyAlcohol(alcohol.cost);
    this.alcohols.push(alcohol);

    console.log(
      `${message} Zakupiono ${alcoType} na polu ${this.name} za ${alcohol.cost}.`
    );
  }
}
