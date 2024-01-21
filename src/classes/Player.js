export default class Player {
  constructor(name, pawn, position) {
    this.name = name;
    this.pawn = pawn;
    this.position = position;
    this.money = 1000;
  }

  // Move on board
  move(steps) {
    this.position += steps;
  }

  // Add money
  addMoney(amount) {
    this.money += amount;
  }

  // Spent money
  substractMoney(amount) {
    this.money -= amount;
  }
}
