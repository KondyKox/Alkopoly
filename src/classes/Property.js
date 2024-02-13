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

    if (property.name === "Start")
      value.innerHTML = `Za przejście przez <span class="property-price">START</span> dostajesz <span class="property-price">100zl.</span>`;
    else if (property.type === "jail")
      value.innerText = "Izba Wytrzeźwień. Tu zostaniesz zamknięty.";
    else if (property.type === "property" || property.type === "fine")
      value.innerHTML = `Cena: <span class="property-price">${property.price}</span> zł`;
    else if (property.type === "reward")
      value.innerText = `Zgarniasz cały hajs jako nagrodę :O`;
    else value.innerText = `Ciągnij szansę.`;

    propertyCard.appendChild(closeButton);
    propertyCard.appendChild(title);
    propertyCard.appendChild(image);
    propertyCard.appendChild(value);

    document.body.appendChild(propertyCard);
    this.currentPropertyCard = propertyCard;
  }
}

export const board = propertyData.map((data) => new Property(data));
