import { gameState } from "../main";
import { updateBoard } from "../utils/board";
import BoardManager from "./PlayerManagers/BoardManager";

export default class Player {
  constructor(id, name, pawn) {
    // Basic attributes
    this.id = id;
    this.name = name;
    this.pawn = pawn;
    this.position = 1;
    this.money = 1000;
    this.color = this.getRandomColor();
    this.properties = {};
    this.isBankrupt = false;

    // Special attributes
    this.isSIGMA = false;
    this.isShot = false;
    this.turnsToHeal = 0;
    this.respect = false;
    this.incognito = 0;
    this.cantMove = 0;
    this.hasKilof = false;
    this.isBlessed = false;
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

  // Remove player from current cell
  clearPlayerFromCell() {
    // Remove player from current position
    const currentCell = document.querySelector(`#c${this.position}`);
    const playerEl = currentCell.querySelector(".player");

    if (playerEl) currentCell.removeChild(playerEl);
  }

  // Get money for going through start
  goThroughStart() {
    const money = gameState.board[0].price;
    this.addMoney(money);
  }

  // Draw player
  draw() {
    // Remove player from current position
    this.clearPlayerFromCell();

    if (this.isBankrupt) return;

    // Draw player element
    const playerElement = document.createElement("div");
    playerElement.className = "player";
    playerElement.style.backgroundColor = this.color;
    playerElement.style.filter = `drop-shadow(0 0 1em ${this.color})`;
    playerElement.innerHTML = `
      <div class="player-name">${this.name}</div> 
      <img class="player-pawn" src="${this.pawn}" alt="${this.name}">
    `;

    const cell = document.querySelector(`#c${this.position}`);
    cell.appendChild(playerElement);
  }

  // Move on board
  move(steps) {
    if (this.cantMove > 0) {
      this.cantMove--;
      return;
    }

    let step = 0;
    const self = this;

    // Move animation
    const moveInterval = setInterval(() => {
      // Remove player from current position
      self.clearPlayerFromCell();

      // Update position
      if (!self.isShot) self.position++;
      else {
        self.position += Math.floor(steps / 2);
        self.turnsToHeal--;

        if (self.turnsToHeal === 0) self.isShot = false;
      }

      if (self.position > 32) {
        self.position -= 32;

        // Get money for full loop
        self.goThroughStart();
      }

      self.draw();
      step++;

      if (step === steps) {
        // Stop the interval after all steps are completed
        clearInterval(moveInterval);

        // Check new possition
        BoardManager.checkCurrentField(this);
      }
    }, 500);
  }

  // Add money
  addMoney(amount) {
    this.money += amount;
  }

  // Spent money
  substractMoney(amount) {
    this.money -= amount;
  }

  // Declare bankruptcy
  bankruptcy() {
    this.isBankrupt = true;

    Object.values(this.properties).forEach((property) => {
      property.resetAfterBankruptcy();
    });

    updateBoard();

    delete gameState.players[this.id];
  }
}
