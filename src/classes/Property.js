import propertyData from "../data/propertyData.json";
import Alcohol from "./Alcohol";
import PropertyManager from "./PlayerManagers/PropertyManager";

class Property {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.image = new Image();
    this.image.src = data.image;
    this.price = data.price;
    this.tax = data.tax;
    this.owner = data.owner;

    this.alcohols = new Alcohol();
    this.background = "none";
  }

  // Reset values after player bankruptcy
  resetProperty() {
    this.owner = null;
    this.background = "none";
    this.alcohols.resetAlcohol();
  }

  // Display property card
  displayPropertyCard() {
    const currentPropertyCard = document.querySelector(".property-card");

    // If property card is open, close it
    if (currentPropertyCard) document.body.removeChild(currentPropertyCard);

    const propertyCard = document.createElement("div");
    propertyCard.className = "property-card";

    // Close button
    const closeButton = document.createElement("button");
    closeButton.className = "property-close";
    closeButton.className = "close-btn";

    closeButton.innerText = "x";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(propertyCard);
    });

    // Property title
    const title = document.createElement("h2");
    title.className = "property-title";
    title.innerText = this.name;

    // Property image
    const image = document.createElement("img");
    image.className = "property-img";
    image.src = this.image.src;
    image.alt = this.name;

    // Value element
    const value = document.createElement("div");
    value.className = "property-value";

    // Property alkohol
    const propertyAlcoholContainer = document.createElement("div");
    propertyAlcoholContainer.className = "property-alcohol-container";

    // Draw alkohol
    if (this.owner) this.alcohols.draw(propertyAlcoholContainer);

    // Property description
    const description = document.createElement("span");
    switch (this.type) {
      case "start":
        description.innerHTML = `Za przejście przez <span class="property-price">START</span> dostajesz <span class="property-price">${this.price}.</span>`;
        break;

      case "jail":
        description.innerText = "Izba Wytrzeźwień. Tu zostaniesz zamknięty.";
        break;

      case "property":
        if (!this.owner)
          description.innerHTML = `Cena: <span class="property-price">${this.price}</span> zł`;
        else {
          description.innerHTML = `Podatek <span class="property-price">${
            this.tax * this.alcohols.taxMultiplier
          }</span> zł dla <span class="property-price">${this.owner}</span>`;

          // Destroy alcohol on click
          propertyAlcoholContainer.addEventListener("click", () =>
            PropertyManager.destroyAlcohol(this.owner, this)
          );
        }
        break;

      case "fine":
        description.innerHTML = `Płacisz <span class="property-price">${this.price}</span> zł mordeczko.`;
        break;

      case "reward":
        description.innerText = `Zgarniasz cały hajs jako nagrodę :O`;
        break;

      case "chance":
        description.innerText = `Ciągnij szansę.`;
        break;

      default:
        break;
    }

    value.appendChild(propertyAlcoholContainer);
    value.appendChild(description);

    propertyCard.appendChild(closeButton);
    propertyCard.appendChild(title);
    propertyCard.appendChild(image);
    propertyCard.appendChild(value);

    document.body.appendChild(propertyCard);
  }
}

export const board = propertyData.map((data) => new Property(data));
