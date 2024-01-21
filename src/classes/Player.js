export default class Player {
  constructor(name, pawn, position) {
    this.name = name;
    this.pawn = pawn;
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
}
