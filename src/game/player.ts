import type { AlkopolyPlayer, Pawn } from "../types/PlayerProps";
import type { Property } from "../types/TileProps";

const START_MONEY = 2000;

const rudy_chuj: Pawn = {
  name: "Rudy Chuj",
  imageSrc: "./pawns/rudy_chuj.png",
};

export default class Player implements AlkopolyPlayer {
  id: string;
  name: string;
  pawn: Pawn;
  money: number = START_MONEY;
  properties: Property[] = [];
  position: number = 1; // First tile on board has id=1
  jailed: boolean = false;
  rolled: boolean = false;
  respect: boolean = false;
  private bonusMoney = 400;
  incognito: number = 0; // amount of use chance card "Półwidoczny"
  kilof: boolean = false;
  sober: number = 0; // amount of not being able to move
  sigma: boolean = false;
  sniper: number = 0; // amount of moving by half
  no_i_chuj: boolean = false; // free from jail card
  monkey: number = 0; // amount of moving by 2 times more

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

    if (toPlayer && this.sigma) {
      this.money += amount;
      toPlayer.money -= amount;
      alert(
        `${this.name} jest SIGMĄ i nie płaci. ${toPlayer.name} płaci frajer.`
      );
      this.sigma = false;
      return;
    }

    if (this.incognito > 0) {
      const random = Math.random();
      if (random > 0.5) {
        this.incognito--;
        alert(`${this.name} jest półwidoczny i nie płaci. 😮😮😮`);
        return;
      }
    }

    const toPay = this.respect ? Math.floor(amount / 2) : amount;
    if (this.respect) this.respect = false;

    this.money -= toPay;
    if (toPlayer) toPlayer.money += toPay;
    console.log(`${this.name} płaci podatek.`);
  }

  move(amount: number, tileLenght: number) {
    if (this.jailed) return; // TODO: coś tu zrobic

    if (this.sober > 0) {
      alert(`${this.name} nie jest trzeźwy więc zostaje w miejscu.`);
      this.sober--;
      return;
    }

    let howMany = amount;

    if (this.sniper > 0) {
      howMany = Math.floor(howMany / 2);
      this.sniper--;
    } else if (this.monkey > 0) {
      howMany *= 2;
      this.monkey--;
    }

    this.position += howMany;

    if (this.position > tileLenght) {
      const newPos = this.position - tileLenght;
      this.position = newPos;
      this.money += this.bonusMoney;
    }
  }

  rudyChuj(): void {
    this.pawn = rudy_chuj;
    alert(`${this.name} jest teraz Rudym Chujem!`);
  }
}
