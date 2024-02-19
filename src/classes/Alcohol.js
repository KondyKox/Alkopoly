export default class Alcohol {
  constructor() {
    this.type = "beer";
    this.quantity = 0;
    this.price = 430;
    this.image = new Image();
    this.image.src = "./game_pieces/alkohol/beer.png";

    this.updateTaxMultiplier();
  }

  // Update tax multiplier
  updateTaxMultiplier() {
    const baseMultiplier = this.type === "beer" ? 1 : 3;
    const quantityMultiplier = this.type === "beer" ? 0.5 : 1;

    this.taxMultiplier = baseMultiplier + this.quantity * quantityMultiplier;
  }

  // Draw alcohol in alcohol property container
  draw(alcoholContainer) {
    for (let i = 0; i < this.quantity; i++) {
      const alkoholImg = document.createElement("img");
      alkoholImg.className = "property-alcohol";
      alkoholImg.src = this.image.src;
      alkoholImg.alt = "ALKOHOL!!!";

      if (this.type === "beer") alkoholImg.classList.add("beer");
      else if (this.type === "vodka") {
        alkoholImg.classList.remove("beer");
        alkoholImg.classList.add("vodka");
      }

      alcoholContainer.appendChild(alkoholImg);
    }
  }

  // Update quantity and tax multiplier
  update() {
    this.quantity++;
    this.updateTaxMultiplier();

    if (this.type === "beer" && this.quantity > 4) this.changeBeerIntoVodka();
  }

  // Destroy 1 alcohol when player has a pickaxe
  destroy(player, property) {
    if (!player.hasKilof) {
      console.log(`${player.name} nie ma kilofa.`);
      return false;
    }

    switch (this.type) {
      case "beer":
        if (this.quantity > 0) {
          this.quantity--;
          console.log(`${player.name} niszczy browara w ${property.name}.`);
        }
        break;

      case "vodka":
        if (this.quantity > 1) {
          this.quantity--;
          console.log(`${player.name} niszczy flaszkę w ${property.name} :(.`);
        } else {
          this.changeVodkaIntoBeer();
          console.log(
            `${player.name} zniszczył ostatnią flaszkę w ${property.name} :(.`
          );
        }
        break;

      default:
        return false;
    }

    // Delete pickaxe from player
    player.hasKilof = false;

    // Update tax multiplier
    this.updateTaxMultiplier();

    // Display updated property card
    property.displayPropertyCard();
  }

  // Change beer into vodka
  changeBeerIntoVodka() {
    this.type = "vodka";
    this.quantity = 1;
    this.price = 900;
    this.image.src = "./game_pieces/alkohol/vodka.png";
    // this.updateTaxMultiplier();
  }

  // Change vodka back to beer
  changeVodkaIntoBeer() {
    this.quantity = 4;
    this.resetToBeer();
  }

  // Reset values after player bankruptcy
  resetAfterBankruptcy() {
    this.quantity = 0;
    this.resetToBeer();
  }

  // Reset to initial beer state
  resetToBeer() {
    this.type = "beer";
    this.price = 430;
    this.image.src = "./game_pieces/alkohol/beer.png";
    this.updateTaxMultiplier();
  }
}
