import pawnsData from "../data/pawnsData.json";

export default class Player {
  constructor(name, pawnId, position) {
    this.name = name;
    this.pawnId = pawnId;
    this.pawn = this.findPawnById(pawnId);
    this.position = position;
    this.money = 1000;
  }

  // Draw player
  draw() {
    const playerElement = document.createElement("div");
    playerElement.className = "player";
    playerElement.innerHTML = `
      <div class="player-name">${this.name}</div> 
      <img class="player-pawn" src="${this.pawn}" alt="${this.name}">
    `;

    const cell = document.querySelector(`#c${this.position}`);
    cell.appendChild(playerElement);
  }

  // Move on board
  move(steps) {
    // Remove player from current position
    const currentCell = document.querySelector(`#c${this.position}`);
    while (currentCell.firstChild) {
      currentCell.removeChild(currentCell.firstChild);
    }

    // Update position
    this.position += steps;
    this.draw();
  }

  // Add money
  addMoney(amount) {
    this.money += amount;
  }

  // Spent money
  substractMoney(amount) {
    this.money -= amount;
  }

  // Find pawn by ID
  findPawnById(pawnId) {
    const foundPawn = pawnsData.find((pawn) => pawn.id === pawnId);

    if (foundPawn) return foundPawn.image;
  }
}
