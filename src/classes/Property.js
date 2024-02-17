import propertyData from "../data/propertyData.json";
import Alcohol from "./Alcohol";

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
  resetAfterBankruptcy() {
    this.owner = null;
    this.background = "none";
    this.alcohols.resetAfterBankruptcy();
  }

  // Display property card
  displayPropertyCard(property) {
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
    title.innerText = property.name;

    // Property image
    const image = document.createElement("img");
    image.className = "property-img";
    image.src = property.image.src;
    image.alt = property.name;

    // Value element
    const value = document.createElement("div");
    value.className = "property-value";

    // Property alkohol
    const propertyAlkoholContainer = document.createElement("div");
    propertyAlkoholContainer.className = "property-alkohol-container";

    // Draw alkohol
    if (property.owner) {
      const alcohol = property.alcohols;

      for (let i = 0; i < alcohol.quantity; i++) {
        const alkoholImg = document.createElement("img");
        alkoholImg.className = "property-alkohol";
        alkoholImg.alt = "ALKOHOL!!!";

        if (alcohol.type === "beer") {
          alkoholImg.src = alcohol.image.src;
          alkoholImg.classList.add("beer");
        } else if (alcohol.type === "vodka") {
          alkoholImg.src = alcohol.image.src;
          alkoholImg.classList.remove("beer");
          alkoholImg.classList.add("vodka");
        }

        propertyAlkoholContainer.appendChild(alkoholImg);
      }
    }

    // Property description
    const description = document.createElement("span");
    switch (property.type) {
      case "start":
        description.innerHTML = `Za przejście przez <span class="property-price">START</span> dostajesz <span class="property-price">${property.price}.</span>`;
        break;

      case "jail":
        description.innerText = "Izba Wytrzeźwień. Tu zostaniesz zamknięty.";
        break;

      case "property":
        if (!property.owner)
          description.innerHTML = `Cena: <span class="property-price">${property.price}</span> zł`;
        else {
          description.innerHTML = `Podatek <span class="property-price">${
            property.tax * property.alcohols.taxMultiplier
          }</span> zł dla <span class="property-price">${
            property.owner
          }</span>`;
        }
        break;

      case "fine":
        description.innerHTML = `Płacisz <span class="property-price">${property.price}</span> zł mordeczko.`;
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

    value.appendChild(propertyAlkoholContainer);
    value.appendChild(description);

    propertyCard.appendChild(closeButton);
    propertyCard.appendChild(title);
    propertyCard.appendChild(image);
    propertyCard.appendChild(value);

    document.body.appendChild(propertyCard);
  }
}

export const board = propertyData.map((data) => new Property(data));
