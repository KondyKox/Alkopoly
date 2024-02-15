import propertyData from "../data/propertyData.json";

export default class Property {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.image = new Image();
    this.image.src = data.image;
    this.price = data.price;
    this.owner = data.owner;
    this.background = "none";
  }

  // Display property card
  static displayPropertyCard(property) {
    // If property card is open, close it
    if (this.currentPropertyCard) {
      document.body.removeChild(this.currentPropertyCard);
      this.currentPropertyCard = null;
    }

    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card");

    // Close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("property-close");
    closeButton.classList.add("close-btn");

    closeButton.innerText = "x";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(propertyCard);
      this.currentPropertyCard = null;
    });

    // Property title
    const title = document.createElement("h2");
    title.classList.add("property-title");
    title.innerText = property.name;

    // Property image
    const image = document.createElement("img");
    image.classList.add("property-img");
    image.src = property.image.src;
    image.alt = property.name;

    const value = document.createElement("span");
    value.classList.add("property-value");

    switch (property.type) {
      case "start":
        value.innerHTML = `Za przejście przez <span class="property-price">START</span> dostajesz <span class="property-price">${property.price}.</span>`;
        break;

      case "jail":
        value.innerText = "Izba Wytrzeźwień. Tu zostaniesz zamknięty.";
        break;

      case "property":
        value.innerHTML = `Cena: <span class="property-price">${property.price}</span> zł`;
        break;

      case "fine":
        value.innerHTML = `Płacisz <span class="property-price">${property.price}</span> zł mordeczko.`;
        break;

      case "reward":
        value.innerText = `Zgarniasz cały hajs jako nagrodę :O`;
        break;

      case "chance":
        value.innerText = `Ciągnij szansę.`;
        break;

      default:
        break;
    }

    propertyCard.appendChild(closeButton);
    propertyCard.appendChild(title);
    propertyCard.appendChild(image);
    propertyCard.appendChild(value);

    document.body.appendChild(propertyCard);
    this.currentPropertyCard = propertyCard;
  }
}

export const board = propertyData.map((data) => new Property(data));
