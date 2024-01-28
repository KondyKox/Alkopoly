export default class GameState {
  constructor() {
    this.players = {};
    this.currentPlayerId = null;
    this.board = [];
    this.currentPropertyCard = null;
  }

  // Initialize board
  initializeBoard(shuffledBoard) {
    this.board = shuffledBoard;
  }

  // Get current player
  getCurrentPlayer() {
    return this.players[this.currentPlayerId];
  }

  // Roll dice
  rollDice() {
    const diceResultEl = document.querySelector(".dice-result");

    // Dice result
    const diceResult = Math.floor(Math.random() * 6) + 1;
    diceResultEl.innerHTML = diceResult;

    const currentPlayer = this.getCurrentPlayer();
    console.log(`${currentPlayer} wyrzucił: ${diceResult}`);
  }

  // Switch player turn
  switchPlayerTurn() {
    const playerIds = Object.keys(this.players);
    const currentPlayerIndex = playerIds.indexOf(this.currentPlayerId);

    if (currentPlayerIndex !== -1) {
      const nextPlayerIndex = (currentPlayerIndex + 1) % playerIds.length;
      this.currentPlayerId = playerIds[nextPlayerIndex];
    }
    // Go back to first player
    else if (playerIds.length > 0) this.currentPlayerId = playerIds[0];
  }

  // Switch turn
  nextTurn() {
    this.switchPlayerTurn();
    const currentPlayer = this.getCurrentPlayer();

    console.log(`Tura należy do ${currentPlayer}`);
  }

  // Display property card
  displayPropertyCard(property) {
    // If property card is open, close it
    if (this.currentPropertyCard) {
      document.body.removeChild(this.currentPropertyCard);
      this.currentPropertyCard = null;
    }

    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card");

    // Close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("property-close");
    closeButton.innerText = "x";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(propertyCard);
      this.currentPropertyCard = null;
    });

    // Property title
    const title = document.createElement("h2");
    title.classList.add("property-title");
    title.innerText = property.name;

    // Property image
    const image = document.createElement("img");
    image.classList.add("property-img");
    image.src = property.image.src;
    image.alt = property.name;

    const value = document.createElement("span");
    value.classList.add("property-value");

    if (property.name === "Start")
      value.innerHTML = `Za przejście przez <span class="property-price">START</span> dostajesz <span class="property-price">100zl.</span>`;
    else if (property.type === "jail")
      value.innerText = "Izba Wytrzeźwień. Tu zostaniesz zamknięty.";
    else
      value.innerHTML = `Cena: <span class="property-price">${property.price}</span> zł`;

    propertyCard.appendChild(closeButton);
    propertyCard.appendChild(title);
    propertyCard.appendChild(image);
    propertyCard.appendChild(value);

    document.body.appendChild(propertyCard);
    this.currentPropertyCard = propertyCard;
  }
}
