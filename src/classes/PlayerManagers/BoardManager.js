import { gameState } from "../../main";
import ChanceCard from "../ChanceCard";
import PropertyManager from "./PropertyManager";

// Board manager for Player
export default class BoardManager {
  // Check current field
  static checkCurrentField(player) {
    const currentCell = gameState.board[player.position - 1];

    switch (currentCell.type) {
      case "jail":
        if (!player.isBlessed) {
          player.cantMove = 3;

          // Change turn
          gameState.areDiceRolled = false;
          gameState.nextTurn();

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

        // Check if someone bought this
        gameState.playerIds.forEach((playerId) => {
          const owner = gameState.players[playerId];
          const playerProperty = owner.properties[currentCell.id];

          if (owner.id !== player.id && playerProperty) {
            isOwned = true;

            if (player.incognito > 0) {
              const isSpotted = Math.random() < 0.5 ? true : false;
              if (!isSpotted) {
                player.incognito--;
                return;
              }
            }

            PropertyManager.payTaxes(
              owner,
              player,
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

    // If current cell is other than chance, diplay property card
    if (currentCell.type !== "chance") currentCell.displayPropertyCard();

    // Change turn
    gameState.areDiceRolled = false;
    gameState.nextTurn();
  }
}
