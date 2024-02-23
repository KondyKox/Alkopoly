import { updateBoard } from "../../utils/board";
import { gameState } from "../../main";

// Property manager for Player
export default class PropertyManager {
  // Buy property
  static buyProperty(property, player) {
    if (player.money >= property.price) {
      player.properties[property.id] = property;
      property.owner = player.name;
      player.substractMoney(property.price);

      property.background = player.color;
      updateBoard();

      console.log(`${player.name} zakupił ${property.name}`);
    } else {
      alert(`No sorry ${player.name}, za biedny jesteś. XD.`);
      console.log(`${player.name} to jebany biedak.`);
    }
  }

  // Sell property
  static sellProperty(player) {
    if (Object.keys(player.properties).length === 0) {
      alert("Nie posiadasz żadnych nieruchomości do sprzedaży.");
      player.bankruptcy();
      return;
    }

    let propertiesList = "Twoje posiadłości:\n";
    Object.values(player.properties).forEach((property) => {
      propertiesList += `ID: ${property.id}, ${property.name}, Zarobisz: ${
        property.tax * property.alcohols.taxMultiplier
      }`;
    });

    const propertyId = prompt(`Wybierz ID, żeby sprzedać:\n${propertiesList}`);

    const propertyToSell = player.properties[propertyId];
    if (!propertyToSell) {
      alert("Niepoprawne ID");
      this.sellProperty(player);
      return;
    }

    const sellingPrice =
      propertyToSell.tax * propertyToSell.alcohols.taxMultiplier;

    player.addMoney(sellingPrice);
    delete player.properties[propertyId];
    alert(`Sprzedano ${propertyToSell.name} za ${sellingPrice}`);
  }

  // Pay taxes to other player
  static payTaxes(propertyOwner, taxpayer, tax) {
    if (!taxpayer.isSIGMA) {
      if (taxpayer.money <= 0) this.sellProperty(taxpayer);

      // If taxpayer has respect he pays only half
      let taxToPay = !taxpayer.respect ? tax : Math.floor(tax / 2);

      taxpayer.substractMoney(taxToPay);
      propertyOwner.addMoney(taxToPay);

      taxpayer.respect = false;

      setTimeout(() => {
        alert(`Podatek ${taxToPay} zł dla ${propertyOwner.name}`);
      }, 200);

      console.log(
        `${taxpayer.name} zapłacił ${taxToPay} zł podatku dla ${propertyOwner.name}.`
      );
    } else {
      propertyOwner.substractMoney(tax);
      taxpayer.addMoney(tax);

      taxpayer.isSIGMA = false;

      setTimeout(() => {
        alert(
          `${propertyOwner.name} płaci podatek ${tax} zł dla SIGMY ${taxpayer.name}`
        );
      }, 200);

      console.log(
        `${taxpayer.name} jest SIGMĄ więc ${propertyOwner.name} płaci mu ${tax} zł.`
      );
    }
  }

  // Buy alkohol in property
  static buyAlcohol(property, player) {
    const alcohol = property.alcohols;

    if (player.money >= alcohol.price) {
      alcohol.update();
      player.substractMoney(alcohol.price);

      alert(`${player.name} kupuje alkohol w ${property.name}.`);
      console.log(
        `${player.name} kupuje alkohol w "${property.name}" za ${alcohol.price} zł.`
      );
    } else {
      alert(`No sorry ${player.name}, za biedny jesteś. XD.`);
      console.log(`${player.name} to jebany biedak.`);
    }
  }

  // Destroy 1 alcohol when player has a pickaxe
  static destroyAlcohol(playerName, property) {
    const player = Object.values(gameState.players).find(
      (player) => player.name === playerName
    );

    property.alcohols.destroy(player, property);
  }
}
