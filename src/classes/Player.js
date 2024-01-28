export default class Player {
  constructor(id, name, pawn, position) {
    this.id = id;
    this.name = name;
    this.pawn = pawn;
    this.position = position;
    this.money = 1000;
    this.color = this.getRandomColor();
  }

  // Random color for player
  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  // Draw player
  draw() {
    const playerElement = document.createElement("div");
    playerElement.className = "player";
    playerElement.style.backgroundColor = this.color;
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
    if (this.position > 32) this.position -= 32;
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
