import chanceCardData from "../data/chanceCardData.json";

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

    const chanceCard = document.createElement("div");
    chanceCard.className = "chance-card";

    // Close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-btn");
    closeButton.classList.add("card-close");

    closeButton.innerText = "x";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(chanceCard);
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

    chanceCard.appendChild(closeButton);
    chanceCard.appendChild(title);
    chanceCard.appendChild(image);
    chanceCard.appendChild(description);
    chanceCard.appendChild(action);

    document.body.appendChild(chanceCard);
  }
}

const chanceCards = chanceCardData.map((data) => new ChanceCard(data));
