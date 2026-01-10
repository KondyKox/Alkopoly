import type { AlkopolyPlayer, Pawn } from "../types/PlayerProps";
import type { Property } from "../types/TileProps";
import type GameStateManager from "./gameState";

const rudy_chuj: Pawn = {
  name: "Rudy Chuj",
  imageSrc: "./pawns/rudy_chuj.png",
};

export default class Player implements AlkopolyPlayer {
  id: string;
  name: string;
  pawn: Pawn;
  money: number = 2000; // start money
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
  turnsToFreedom: number = 3;

  constructor(id: string, name: string, pawn: Pawn) {
    this.id = id;
    this.name = name;
    this.pawn = pawn;
  }

  buyProperty(tile: Property): void {
    if (!tile.price) return;

    if (this.money < tile.price) {
      alert("BIEDAK JESTEŚ!!!");
      return;
    }

    this.money -= tile.price;
    this.properties.push(tile);
    tile.owner = this;

    console.log(`${this.name} kupił ${tile.name} za ${tile.price}`);
  }

  buyAlcohol(cost: number): void {
    if (this.money < cost) {
      alert("BIEDAK JESTEŚ!!!");
      return;
    }

    this.money -= cost;

    console.log(`${this.name} kupił alkohol za ${cost}`);
  }

  payTax(
    amount: number,
    gameState: GameStateManager,
    toPlayer?: AlkopolyPlayer
  ): void {
    if (this.money <= 0) {
      alert(`${this.name} TO BIEDAK JEBANY 😂😂😂`);
      gameState.goToJail(this);
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

  payExciseTax(gameState: GameStateManager): void {
    let totalExcise = 0;

    this.properties.forEach((property) => {
      if (
        "getAlcohols" in property &&
        typeof property.getAlcohols === "function"
      ) {
        property.getAlcohols().forEach((alco) => {
          const excise =
            alco.type === "vodka" ? alco.cost * 0.7 : alco.cost * 0.3;

          this.money -= excise;
          totalExcise += excise;
          gameState.reward += totalExcise;
        });
      }

      if (totalExcise > 0) {
        alert(`${this.name} płaci ${totalExcise.toFixed(2)} akcyzy.`);
        console.log(`${this.name} płaci ${totalExcise.toFixed(2)} akcyzy.`);
      } else {
        alert(`${this.name} nie ma żadnych alkoholi. Nic nie płaci.`);
        console.log(`${this.name} nie ma żadnych alkoholi. Nic nie płaci.`);
      }
    });

    console.log(`${this.name} płaci akcyzę.`);
  }

  move(amount: number, gameState: GameStateManager) {
    if (this.jailed) {
      alert(
        `${this.name} siedzi na izbie wytrzeźwień jeszcze ${this.turnsToFreedom} tury.`
      );
      this.turnsToFreedom--;
      if (this.turnsToFreedom <= 0) gameState.exitJail(this);
      return;
    }

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

    if (this.position > gameState.tiles.length) {
      const newPos = this.position - gameState.tiles.length;
      this.position = newPos;
      this.money += this.bonusMoney;
    }

    gameState.renderBoard();
    gameState.checkTile(this);
  }

  rudyChuj(): void {
    this.pawn = rudy_chuj;
    alert(`${this.name} jest teraz Rudym Chujem!`);
  }
}
