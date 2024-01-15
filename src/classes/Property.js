import propertyData from "../data/propertyData.json";

class Property {
  constructor(id, name, type, imageSrc, price, owner) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.image = new Image();
    this.image.src = imageSrc;
    this.price = price;
    this.owner = owner;
  }
}

export const board = propertyData.map((data) => {
  return new Property(
    data.id,
    data.name,
    data.type,
    data.image,
    data.price,
    data.owner
  );
});
