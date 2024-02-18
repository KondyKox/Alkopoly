import { gameState } from "../../main";
import ChanceCard from "../ChanceCard";
import PropertyManager from "./PropertyManager";

// Board manager for Player
export default class BoardManager {
  // Drive anywhere
  static driveAnywhere(player) {
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

      player.clearPlayerFromCell();
      player.position = parseInt(newPossition[0]);
      player.draw();

      cells.forEach((cell) => {
        cell.removeEventListener("click", handleCellClick);
      });
    }
  }

  // Check current field
  static checkCurrentField(player) {
    const currentCell = gameState.board[player.position - 1]

    switch (currentCell.type) {
      case "jail":
        if (!player.isBlessed) {
          player.cantMove = 3;
          return;
        }
        player.isBlessed = false;
        break;

      case "chance":
        ChanceCard.drawChanceCard(player.id);
        break;

      case "fine":
        const moneyToPay = currentCell.price;
        player.substractMoney(moneyToPay);
        gameState.setReward(moneyToPay);
        break;

      case "reward":
        player.addMoney(gameState.reward);
        gameState.setReward(-gameState.reward);
        break;

      case "property":
        let isOwned = false;

        // Check if already owned
        Object.values(player.properties).forEach((property) => {
          if (property.id === currentCell.id) {
            isOwned = true;

            // Confirm if you want to buy the alcohol
            setTimeout(() => {
              const confirmation = confirm(
                `Czy chcesz kupić alkohol w "${currentCell.name}" za ${currentCell.alcohols.price} zł?`
              );
              if (confirmation) PropertyManager.buyAlcohol(currentCell, player);
            }, 200);

            return;
          }
        });

        // Check if someone bought player
        gameState.playerIds.forEach((playerId) => {
          const player = gameState.players[playerId];
          const playerProperty = player.properties[currentCell.id];

          if (player.id !== this.id && playerProperty) {
            isOwned = true;

            if (player.incognito > 0) {
              const isSpotted = Math.random() < 0.5 ? true : false;
              if (isSpotted) {
                PropertyManager.payTaxes(
                  player,
                  this,
                  playerProperty.tax * playerProperty.alcohols.taxMultiplier
                );

                player.incognito--;
                return;
              }
            }

            PropertyManager.payTaxes(
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
            if (confirmation) PropertyManager.buyProperty(currentCell, player);
          }, 200);
        }

        break;

      default:
        break;
    }

    // If current cell other than chance, diplay property card
    if (currentCell.type !== "chance") currentCell.displayPropertyCard();
  }
}
