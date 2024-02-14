import chanceCardData from "../data/chanceCardData.json";
import { gameState } from "../main";

export default class ChanceCard {
  constructor(data) {
    this.name = data.name;
    this.text = data.text;
    this.action = data.action;
    this.image = new Image();
    this.image.src = data.image;
  }

  // Take random chance card
  static drawChanceCard(playerId) {
    // const chanceCardId = Math.floor(Math.random() * chanceCards.length);
    const chanceCardId = 20; // testing

    const chanceCardEl = document.createElement("div");
    chanceCardEl.className = "chance-card";

    // Close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-btn");
    closeButton.classList.add("card-close");

    closeButton.innerText = "x";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(chanceCardEl);
      chanceCards[chanceCardId].chanceCardAction(
        playerId,
        chanceCards[chanceCardId]
      );
    });

    // Card title
    const title = document.createElement("h2");
    title.className = "card-title";
    title.innerText = chanceCards[chanceCardId].name;

    // Card image
    const image = document.createElement("img");
    image.className = "card-image";
    image.src = chanceCards[chanceCardId].image.src;
    image.alt = chanceCards[chanceCardId].name;

    // Card description
    const description = document.createElement("p");
    description.className = "card-description";
    description.innerText = chanceCards[chanceCardId].text;

    // Card action
    const action = document.createElement("p");
    action.className = "card-action";
    action.innerText = chanceCards[chanceCardId].action;

    // Display chance card on screen
    chanceCardEl.appendChild(closeButton);
    chanceCardEl.appendChild(title);
    chanceCardEl.appendChild(image);
    chanceCardEl.appendChild(description);
    chanceCardEl.appendChild(action);

    document.body.appendChild(chanceCardEl);
  }

  // Execute chance card action
  chanceCardAction(playerId, chanceCard) {
    switch (chanceCard.name) {
      case "Zestaw Deluxe":
        gameState.players[playerId].substractMoney(100);
        gameState.players[playerId].move(4);

        console.log(`${gameState.players[playerId]} zakupił Zestaw Deluxe.`);
        break;

      case "Zakup zioła":
        gameState.board.forEach((field, index) => {
          if (field.name === chanceCard.name) {
            gameState.players[playerId].clearPlayerFromCell();
            gameState.players[playerId].position = index + 1;
            gameState.players[playerId].draw();
            return;
          }
        });
        console.log(`${gameState.players[playerId].name} idzie kupić jazz.`);
        break;

      case "Tatuaż TJ":
        gameState.players[playerId].respect = true;
        console.log(
          `${gameState.players[playerId].name} zyskuje respekt za tatuaż TJ.`
        );
        break;

      case "Półwidoczny":
        gameState.players[playerId].incognito = 3;
        console.log(
          `${gameState.players[playerId].name} staje się Incognito Półwidoczny.`
        );
        break;

      case "Koleje Dolnośląskie":
        gameState.players[playerId].clearPlayerFromCell();
        gameState.players[playerId].position = 1;
        gameState.players[playerId].draw();

        console.log(
          `${gameState.players[playerId].name} wsiada w Koleje Dolnośląskie.`
        );
        break;

      case "Kilof":
        break;

      case "Wódka ❤":
        gameState.board.forEach((field, index) => {
          if (field.name === "Zakup alkoholu") {
            gameState.players[playerId].clearPlayerFromCell();
            gameState.players[playerId].position = index + 1;
            gameState.players[playerId].draw();
            return;
          }
        });
        console.log(`${gameState.players[playerId].name} idzie kupić wódkę.`);
        break;

      case "Emotki":
        let moneyFromEmoji = 0;
        gameState.playerIds.forEach((playerIndex) => {
          const player = gameState.players[playerIndex];
          player.substractMoney(20);
          moneyFromEmoji += 20;
        });
        gameState.players[playerId].addMoney(moneyFromEmoji);
        gameState.players[playerId].cantMove = 1;

        console.log(
          `${gameState.players[playerId].name} robi emotki, więc dostaje hajsik.`
        );
        break;

      case "Zgon":
        let chanceCardFields = [];
        gameState.board.forEach((field, index) => {
          if (field.name === "Karta Szansy") chanceCardFields.push(index + 1);
        });

        const randomChanceCardField = Math.floor(
          Math.random() * chanceCardFields.length
        );

        gameState.players[playerId].clearPlayerFromCell();
        gameState.players[playerId].position =
          chanceCardFields[randomChanceCardField];
        gameState.players[playerId].draw();

        console.log(
          `${gameState.players[playerId].name} zgonuje. Ale dostaje drugą szansę.`
        );
        break;

      case "Izba wytrzeźwień":
        gameState.board.forEach((field, index) => {
          if (field.name === chanceCard.name) {
            gameState.players[playerId].clearPlayerFromCell();
            gameState.players[playerId].position = index + 1;
            gameState.players[playerId].draw();
            return;
          }
        });
        console.log(
          `${gameState.players[playerId].name} idzie do Izby wytrzeźwień. Jebany alkoholik.`
        );
        break;

      case "Prezent urodzinowy":
        let birthdayMoney = 0;
        gameState.playerIds.forEach((playerIndex) => {
          const player = gameState.players[playerIndex];
          player.substractMoney(50);
          birthdayMoney += 50;
        });
        gameState.players[playerId].addMoney(birthdayMoney);

        console.log(
          `${gameState.players[playerId].name} ma urodzinki, więc zarabia.`
        );
        break;

      case "Scam and Run":
        gameState.players[playerId].addMoney(1000000);
        gameState.players[playerId].substractMoney(999000);
        console.log(
          `${gameState.players[playerId].name} zarabia 1 000 000zł ze Scam and Run. Oraz traci 999 000zł.`
        );
        break;

      case "Wiadro":
        gameState.players[playerId].cantMove = 2;
        console.log(
          `${gameState.players[playerId].name} wali wiadro i nie rusza się 2 tury.`
        );
        break;

      case "Wypłata":
        gameState.board.forEach((field, index) => {
          if (field.name === chanceCard.name) {
            gameState.players[playerId].clearPlayerFromCell();
            gameState.players[playerId].position = index + 1;
            gameState.players[playerId].draw();
            return;
          }
        });
        console.log(`${gameState.players[playerId].name} dostaje wypłątę.`);
        break;

      case "Rudy chuj":
        gameState.players[playerId].pawn = "./game_pieces/pawns/rudy_chuj.png";
        gameState.players[playerId].draw();
        console.log(`${gameState.players[playerId].name} to rudy chuj.`);
        break;

      case "SIGMA":
        gameState.players[playerId].isSIGMA = true;
        console.log(`${gameState.players[playerId].name} zostaje SIGMĄ.`);
        break;

      case "Main Event":
        gameState.players[playerId].substractMoney(200);
        console.log(
          `${gameState.players[playerId].name} traci 200zł z powodu wizyty Szczepana.`
        );
        break;

      case "Alkoholizm":
        const lostMoney = Math.floor(gameState.players[playerId].money / 10);
        gameState.players[playerId].substractMoney(lostMoney);

        console.log(
          `${gameState.players[playerId].name} w wyniku alkoholizmu traci ${lostMoney}zł.`
        );
        break;

      case "Tankowanie Polówki":
        gameState.players[playerId].substractMoney(51);
        console.log(`${gameState.players[playerId].name} tankuje za 51zł.`);
        break;

      case "Małżeństwo":
        const moneyToGive = Math.floor(gameState.players[playerId].money / 5);

        const randomPlayerIndex = Math.floor(
          Math.random() * gameState.playerIds.length
        );
        const randomPlayer =
          gameState.players[gameState.playerIds[randomPlayerIndex]];

        gameState.players[playerId].substractMoney(moneyToGive);
        randomPlayer.addMoney(moneyToGive);

        console.log(
          `${gameState.players[playerId].name} oddał ${moneyToGive}zł dla ${randomPlayer.name}.`
        );
        break;

      case "Polówka":
        gameState.players[playerId].driveAnywhere();
        console.log(
          `${gameState.players[playerId].name} wsiada do Polówki i jedzie gdzie chce.`
        );
        break;

      case "Snajper":
        gameState.players[playerId].isShot = true;
        console.log(
          `${gameState.players[playerId].name} został postrzelony przez Snajpera.`
        );
        break;

      case "No i chuj":
        break;

      case "Szczęśliwy Pawełek":
        gameState.players[playerId].isPawelekHappy = true;
        console.log(
          `Pawełek jest szczęśliwy dzięki ${gameState.players[playerId].name}`
        );
        break;

      default:
        break;
    }
  }
}

const chanceCards = chanceCardData.map((data) => new ChanceCard(data));
