import { gameState, socket } from "../main";
import ChanceCard from "./ChanceCard";
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

  // Remove player from current cell
  clearPlayerFromCell() {
    // Remove player from current position
    const currentCell = document.querySelector(`#c${this.position}`);
    const playerEl = currentCell.querySelector(".player");

    if (playerEl) currentCell.removeChild(playerEl);

    // Update on server
    socket.emit("updatePlayers", gameState.players);
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
        this.checkCurrentField();
      }
    }, 500);
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
    if (this.money >= property.price) {
      this.properties[property.id] = property;
      property.owner = this.name;
      this.substractMoney(property.price);

      property.background = this.color;
      updateBoard();

      console.log(`${this.name} zakupił ${property.name}`);
    } else {
      alert(`No sorry ${this.name}, za biedny jesteś. XD.`);
      console.log(`${this.name} to jebany biedak.`);
    }
  }

  // Pay taxes to other player
  payTaxes(propertyOwner, taxpayer, tax) {
    if (!taxpayer.isSIGMA) {
      if (this.money >= 0) bankruptcy();

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
        `${taxpayer.name} jest SIGMĄ więc ${propertyOwner.name} płaci mu ${tax} zł.`
      );
    }
  }

  // Buy alkohol in property
  buyAlcohol(property) {
    const alcohol = property.alcohols;

    if (this.money >= alcohol.price) {
      alcohol.update();
      this.substractMoney(alcohol.price);

      alert(`${this.name} kupuje alkohol w ${property.name}.`);
      console.log(
        `${this.name} kupuje alkohol w "${property.name}" za ${alcohol.price} zł.`
      );
    } else {
      alert(`No sorry ${this.name}, za biedny jesteś. XD.`);
      console.log(`${this.name} to jebany biedak.`);
    }
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

  // Drive anywhere
  driveAnywhere() {
    const self = this;

    const cells = document.querySelectorAll(".board-cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });

    // Handle click to drive
    function handleCellClick(event) {
      let target = event.target;
      while (target !== null && !target.classList.contains("board-cell"))
        target = target.parentNode;

      const cellId = target.id;
      const newPossition = cellId.match(/\d+/);

      self.clearPlayerFromCell();
      self.position = parseInt(newPossition[0]);
      self.draw();

      cells.forEach((cell) => {
        cell.removeEventListener("click", handleCellClick);
      });
    }
  }

  // Check current field
  checkCurrentField() {
    const currentCell = gameState.board[this.position - 1];

    switch (currentCell.type) {
      case "start":
        currentCell.displayPropertyCard(currentCell);
        break;

      case "jail":
        if (!this.isBlessed) {
          this.cantMove = 3;
          currentCell.displayPropertyCard(currentCell);
          return;
        }
        this.isBlessed = false;
        break;

      case "chance":
        ChanceCard.drawChanceCard(this.id);
        break;

      case "fine":
        currentCell.displayPropertyCard(currentCell);

        const moneyToPay = currentCell.price;
        this.substractMoney(moneyToPay);
        gameState.setReward(moneyToPay);
        break;

      case "reward":
        currentCell.displayPropertyCard(currentCell);

        if (this.isPawelekHappy) {
          this.addMoney(gameState.reward * 2);
          this.isPawelekHappy = false;
        } else this.addMoney(gameState.reward);

        gameState.setReward(-gameState.reward);
        break;

      case "property":
        currentCell.displayPropertyCard(currentCell);

        let isOwned = false;

        // Check if already owned
        Object.values(this.properties).forEach((property) => {
          if (property.id === currentCell.id) {
            isOwned = true;

            // Confirm if you want to buy the alcohol
            setTimeout(() => {
              const confirmation = confirm(
                `Czy chcesz kupić alkohol w "${currentCell.name}" za ${currentCell.alcohols.price} zł?`
              );
              if (confirmation) this.buyAlcohol(currentCell);
            }, 200);

            return;
          }
        });

        // Check if someone bought this
        gameState.playerIds.forEach((playerId) => {
          const player = gameState.players[playerId];
          const playerProperty = player.properties[currentCell.id];

          if (player.id !== this.id && playerProperty) {
            isOwned = true;

            if (this.incognito > 0) {
              const isSpotted = Math.random() < 0.5 ? true : false;
              if (isSpotted) {
                this.payTaxes(
                  player,
                  this,
                  playerProperty.tax * playerProperty.alcohols.taxMultiplier
                );

                this.incognito--;
                return;
              }
            }

            this.payTaxes(
              player,
              this,
              playerProperty.tax * playerProperty.alcohols.taxMultiplier
            );
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
}
