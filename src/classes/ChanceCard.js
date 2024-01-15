import chanceCardData from "../data/chanceCardData.json";

class ChanceCard {
  constructor(data) {
    this.name = data.name;
    this.text = data.text;
    this.action = data.action;
    this.image = new Image();
    this.image.src = data.image;
  }
}

export const chanceCards = chanceCardData.map((data) => new ChanceCard(data));
