import propertyData from "../data/propertyData.json";

class Property {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.image = new Image();
    this.image.src = data.image;
    this.price = data.price;
    this.owner = data.owner;
  }
}

export const board = propertyData.map((data) => new Property(data));
