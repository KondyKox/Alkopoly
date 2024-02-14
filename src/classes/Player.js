import { gameState, socket } from "../main";
import ChanceCard from "./ChanceCard";

export default class Player {
  constructor(id, name, pawn, position) {
    this.id = id;
    this.name = name;
    this.pawn = pawn;
    this.position = position;
    this.money = 1000;
    this.color = this.getRandomColor();

    this.isSIGMA = false;
    this.isShot = false;
    this.turnsToHeal = 2;
    this.respect = false;
    this.incognito = 0;
    this.cantMove = 0;
    this.isPawelekHappy = false;
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
    // Remove player from current position
    this.clearPlayerFromCell();

    // Draw player element
    const playerElement = document.createElement("div");
    playerElement.className = "player";
    playerElement.style.backgroundColor = this.color;
    playerElement.innerHTML = `
      <div class="player-name">${this.name}</div> 
      <img class="player-pawn" src="${this.pawn}" alt="${this.name}">
    `;

    const cell = document.querySelector(`#c${this.position}`);
    cell.appendChild(playerElement);

    // Update on server
    socket.emit("updatePlayers", gameState.players);
  }

  // Move on board
  move(steps) {
    if (this.cantMove > 0) {
      this.cantMove--;
      return;
    }

    // Remove player from current position
    this.clearPlayerFromCell();

    // Update position
    if (!this.isShot) this.position += steps;
    else {
      this.position += Math.floor(steps / 2);
      this.turnsToHeal--;

      if (this.turnsToHeal === 0) this.isShot = false;
    }

    if (this.position > 32) this.position -= 32;

    // Check new possition
    this.checkCurrentField();

    this.draw();
  }

  // Add money
  addMoney(amount) {
    this.money += amount;

    // Update on server
    socket.emit("updatePlayers", gameState.players);
  }

  // Spent money
  substractMoney(amount) {
    this.money -= amount;

    // Update on server
    socket.emit("updatePlayers", gameState.players);
  }

  // Drive anywhere
  driveAnywhere() {
    const self = this;

    const cells = document.querySelectorAll(".board-cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });

    // Handle click to drive
    function handleCellClick(event) {
      const cellId = event.target.id;
      const newPossition = cellId.match(/\d+/);

      console.log(parseInt(newPossition[0]));

      self.clearPlayerFromCell();
      self.position = parseInt(newPossition[0]);
      self.draw();

      cells.forEach((cell) => {
        cell.removeEventListener("click", handleCellClick);
      });
    }
  }

  // Remove player from current cell
  clearPlayerFromCell() {
    // Remove player from current position
    const currentCell = document.querySelector(`#c${this.position}`);
    const playerEl = currentCell.querySelector(".player");

    if (playerEl) currentCell.removeChild(playerEl);

    // Update on server
    socket.emit("updatePlayers", gameState.players);
  }

  // Check current field
  checkCurrentField() {
    if (gameState.board[this.position - 1].type === "chance")
      ChanceCard.drawChanceCard(this.id);
  }
}
