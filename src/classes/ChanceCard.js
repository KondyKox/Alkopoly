import chanceCardData from "../data/chanceCardData.json";
import { gameState, socket } from "../main";

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
    const chanceCardId = Math.floor(Math.random() * chanceCards.length);

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
    const player = gameState.players[playerId];

    switch (chanceCard.name) {
      case "Zestaw Deluxe":
        player.substractMoney(100);
        player.move(4);

        gameState.setReward(100);

        console.log(`${player} zakupił Zestaw Deluxe.`);
        break;

      case "Zakup zioła":
        gameState.board.forEach((field, index) => {
          if (field.name === chanceCard.name) {
            player.clearPlayerFromCell();
            player.position = index + 1;
            player.draw();
            return;
          }
        });
        console.log(`${player.name} idzie kupić jazz.`);
        break;

      case "Tatuaż TJ":
        player.respect = true;
        console.log(`${player.name} zyskuje respekt za tatuaż TJ.`);
        break;

      case "Półwidoczny":
        player.incognito = 3;
        console.log(`${player.name} staje się Incognito Półwidoczny.`);
        break;

      case "Koleje Dolnośląskie":
        player.clearPlayerFromCell();
        player.position = 1;
        player.draw();

        console.log(`${player.name} wsiada w Koleje Dolnośląskie.`);
        break;

      case "Kilof":
        player.hasKilof = true;
        console.log(
          `${player.name} zbudował kilof po jaraniu i teraz może niszczyć.`
        );
        break;

      case "Wódka ❤":
        gameState.board.forEach((field, index) => {
          if (field.name === "Zakup alkoholu") {
            player.clearPlayerFromCell();
            player.position = index + 1;
            player.draw();
            return;
          }
        });
        console.log(`${player.name} idzie kupić wódkę.`);
        break;

      case "Emotki":
        let moneyFromEmoji = 0;
        gameState.playerIds.forEach((playerIndex) => {
          const player = gameState.players[playerIndex];
          player.substractMoney(20);
          moneyFromEmoji += 20;
        });
        player.addMoney(moneyFromEmoji);
        player.cantMove = 1;

        console.log(`${player.name} robi emotki, więc dostaje hajsik.`);
        break;

      case "Zgon":
        if (!player.isBlessed) {
          gameState.board.forEach((field, index) => {
            if (field.name === "Izba wytrzeźwień") {
              player.clearPlayerFromCell();
              player.position = index + 1;
              player.draw();
              return;
            }
          });
          console.log(
            `${player.name} idzie do Izby wytrzeźwień. Jebany alkoholik.`
          );
        } else {
          alert(`${player.name} uratowany poprzez błogosławieństwo.`);
          console.log(`${player.name} uratowany poprzez błogosławieństwo.`);
        }
        break;

      case "Prezent urodzinowy":
        let birthdayMoney = 0;
        gameState.playerIds.forEach((playerIndex) => {
          const player = gameState.players[playerIndex];
          player.substractMoney(50);
          birthdayMoney += 50;
        });
        player.addMoney(birthdayMoney);

        console.log(`${player.name} ma urodzinki, więc zarabia.`);
        break;

      case "Scam and Run":
        player.addMoney(1000000);
        player.substractMoney(999000);
        console.log(
          `${player.name} zarabia 1 000 000zł ze Scam and Run. Oraz traci 999 000zł.`
        );
        break;

      case "Wiadro":
        player.cantMove = 2;
        console.log(`${player.name} wali wiadro i nie rusza się 2 tury.`);
        break;

      case "Wypłata":
        gameState.board.forEach((field, index) => {
          if (field.name === chanceCard.name) {
            player.clearPlayerFromCell();
            player.position = index + 1;
            player.draw();
            return;
          }
        });
        console.log(`${player.name} dostaje wypłatę.`);
        break;

      case "Rudy chuj":
        player.pawn = "./game_pieces/pawns/rudy_chuj.png";
        player.draw();
        console.log(`${player.name} to rudy chuj.`);
        break;

      case "SIGMA":
        player.isSIGMA = true;
        console.log(`${player.name} zostaje SIGMĄ.`);
        break;

      case "Main Event":
        player.substractMoney(200);
        console.log(`${player.name} traci 200zł z powodu wizyty Szczepana.`);
        break;

      case "Alkoholizm":
        const lostMoney = Math.floor(player.money / 10);
        player.substractMoney(lostMoney);

        console.log(
          `${player.name} w wyniku alkoholizmu traci ${lostMoney}zł.`
        );
        break;

      case "Tankowanie Polówki":
        player.substractMoney(51);
        gameState.setReward(51);
        console.log(`${player.name} tankuje za 51zł.`);
        break;

      case "Małżeństwo":
        const moneyToGive = Math.floor(player.money / 5);

        const randomPlayerIndex = Math.floor(
          Math.random() * gameState.playerIds.length
        );
        const randomPlayer =
          gameState.players[gameState.playerIds[randomPlayerIndex]];

        player.substractMoney(moneyToGive);
        randomPlayer.addMoney(moneyToGive);

        console.log(
          `${player.name} oddał ${moneyToGive}zł dla ${randomPlayer.name}.`
        );
        break;

      case "Polówka":
        player.driveAnywhere();
        console.log(`${player.name} wsiada do Polówki i jedzie gdzie chce.`);
        break;

      case "Snajper":
        player.isShot = true;
        console.log(`${player.name} został postrzelony przez Snajpera.`);
        break;

      case "No i chuj":
        player.isBlessed = true;
        console.log(`No i chuj! ${player.name} został błogosławiony.`);
        break;

      case "Szczęśliwy Pawełek":
        player.isPawelekHappy = true;
        console.log(`Pawełek jest szczęśliwy dzięki ${player.name}`);
        break;

      default:
        break;
    }

    // Update players on server
    socket.emit("updatePlayers", gameState.players);
  }
}

const chanceCards = chanceCardData.map((data) => new ChanceCard(data));
