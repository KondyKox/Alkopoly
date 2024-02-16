import { gameState, socket } from "../main";
import ChanceCard from "./ChanceCard";
import Property from "./Property";
import { updateBoard } from "../utils/generateBoard";

export default class Player {
  constructor(id, name, pawn, position) {
    // Basic attributes
    this.id = id;
    this.name = name;
    this.pawn = pawn;
    this.position = position;
    this.money = 1000;
    this.color = this.getRandomColor();
    this.properties = {};

    // Special attributes
    this.isSIGMA = false;
    this.isShot = false;
    this.turnsToHeal = 0;
    this.respect = false;
    this.incognito = 0;
    this.cantMove = 0;
    this.hasKilof = false;
    this.isBlessed = false;
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

    if (this.position > 32) {
      this.position -= 32;

      // Get money for full loop
      this.goThroughStart();
    }

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

  // Buy property
  buyProperty(property) {
    this.properties[property.id] = property;
    property.owner = this.name;
    this.substractMoney(property.price);

    gameState.board[this.position - 1].background = this.color;
    updateBoard();

    console.log(`${this.name} zakupił ${property.name}`);
  }

  // Pay taxes to other player
  payTaxes(propertyOwner, taxpayer, tax) {
    if (!taxpayer.isSIGMA) {
      taxpayer.substractMoney(tax);
      propertyOwner.addMoney(tax);

      setTimeout(() => {
        alert(`Podatek ${tax} zł dla ${propertyOwner.name}`);
      }, 200);

      console.log(
        `${taxpayer.name} zapłacił ${tax} zł podatku dla ${propertyOwner.name}.`
      );
    } else {
      propertyOwner.substractMoney(tax);
      taxpayer.addMoney(tax);

      taxpayer.isSIGMA = false;

      setTimeout(() => {
        alert(
          `${propertyOwner.name}Płaci podatek ${tax} zł dla SIGMY ${taxpayer.name}`
        );
      }, 200);

      console.log(
        `${taxpayer.name} jest SIGMĄ więc ${propertyOwner.name} płaci mu ${tax}`
      );
    }
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
    const currentCell = gameState.board[this.position - 1];

    switch (currentCell.type) {
      case "start":
        Property.displayPropertyCard(currentCell);
        break;

      case "jail":
        if (!this.isBlessed) {
          this.cantMove = 3;
          Property.displayPropertyCard(currentCell);
          return;
        }
        this.isBlessed = false;
        break;

      case "chance":
        ChanceCard.drawChanceCard(this.id);
        break;

      case "fine":
        Property.displayPropertyCard(currentCell);

        const moneyToPay = currentCell.price;
        this.substractMoney(moneyToPay);
        gameState.setReward(moneyToPay);
        break;

      case "reward":
        Property.displayPropertyCard(currentCell);

        this.addMoney(gameState.reward);
        gameState.setReward(-gameState.reward);
        break;

      case "property":
        Property.displayPropertyCard(currentCell);

        let isOwned = false;

        // Check if already owned
        Object.values(this.properties).forEach((property) => {
          if (property.id === currentCell.id) {
            isOwned = true;
            return;
          }
        });

        // Check if someone bought this
        gameState.playerIds.forEach((playerId) => {
          const player = gameState.players[playerId];

          if (player.id !== this.id && player.properties[currentCell.id]) {
            isOwned = true;

            if (this.incognito > 0) {
              const isSpotted = Math.random() < 0.5 ? true : false;
              if (isSpotted) {
                this.payTaxes(
                  player,
                  this,
                  player.properties[currentCell.id].tax
                );

                this.incognito--;
                return;
              }
            }
            this.payTaxes(player, this, player.properties[currentCell.id].tax);
            return;
          }
        });

        // Confirm your purchase
        if (!isOwned) {
          setTimeout(() => {
            const confirmation = confirm(
              `Kupujesz "${currentCell.name}" za ${currentCell.price}zł?`
            );
            if (confirmation) this.buyProperty(currentCell);
          }, 200);
        }

        break;

      default:
        break;
    }
  }

  // Get money for going through start
  goThroughStart() {
    const money = gameState.board[0].price;
    this.addMoney(money);
  }
}
