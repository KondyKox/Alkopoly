export default class Alcohol {
  constructor() {
    this.type = "beer";
    this.quantity = 0;
    this.taxMultiplier = 1;
    this.price = 430;
    this.image = new Image();
    this.image.src = "./game_pieces/alkohol/beer.png";
  }

  // Update quantity and tax multiplier
  update() {
    this.quantity++;
    this.taxMultiplier += this.type = "beer" ? 0.5 : 1;

    if (this.type === "beer" && this.quantity > 4) this.changeBeerIntoVodka();
  }

  // Change beer into vodka
  changeBeerIntoVodka() {
    this.type = "vodka";
    this.quantity = 1;
    this.taxMultiplier = 4;
    this.price = 900;
    this.image.src = "./game_pieces/alkohol/vodka.png";
  }

  // Reset values after player bankruptcy
  resetAfterBankruptcy() {
    this.type = "beer";
    this.quantity = 0;
    this.taxMultiplier = 1;
    this.price = 430;
    this.image.src = "./game_pieces/alkohol/beer.png";
  }
}
