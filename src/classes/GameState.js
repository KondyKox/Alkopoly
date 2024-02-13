import { socket } from "../main";

export default class GameState {
  constructor() {
    this.players = {};
    this.playerIds = null;
    this.currentPlayerId = null;
    this.currentPlayerEl = document.querySelector(".current-player__name");
    this.board = [];
    this.currentPropertyCard = null;
    this.isGameStarted = false;
  }

  // Initialize board
  initializeBoard(shuffledBoard) {
    this.board = shuffledBoard;
  }

  // Get current player
  getCurrentPlayer() {
    return this.players[this.currentPlayerId];
  }

  // Start the game
  startGame() {
    this.isGameStarted = true;

    // Set first player as the current player
    this.playerIds = Object.keys(this.players);
    this.currentPlayerId = this.playerIds[0];

    this.currentPlayerEl.textContent = this.players[this.currentPlayerId].name;

    console.log(
      `Gra się zaczęła! ${this.players[this.currentPlayerId].name} rozpoczyna.`
    );
  }

  // Roll dice
  rollDice() {
    const diceResultEl = document.querySelector(".dice-result");

    // Dice result
    const diceResult = Math.floor(Math.random() * 6) + 1;
    diceResultEl.innerHTML = diceResult;

    const currentPlayer = this.getCurrentPlayer();
    console.log(`${currentPlayer.name} wyrzucił: ${diceResult}`);

    currentPlayer.move(diceResult);

    // Change possition on server
    socket.emit("rollDice", { playerId: currentPlayer.id, steps: diceResult });

    // Change turn
    this.nextTurn();
  }

  // Switch player turn
  switchPlayerTurn() {
    const currentPlayerIndex = this.playerIds.indexOf(this.currentPlayerId);

    if (currentPlayerIndex !== -1) {
      const nextPlayerIndex = (currentPlayerIndex + 1) % this.playerIds.length;
      this.currentPlayerId = this.playerIds[nextPlayerIndex];
    }
    // Go back to first player
    else if (this.playerIds.length > 0)
      this.currentPlayerId = this.playerIds[0];
  }

  // Switch turn
  nextTurn() {
    this.switchPlayerTurn();
    const currentPlayer = this.getCurrentPlayer();

    this.currentPlayerEl.textContent = this.players[this.currentPlayerId].name;

    console.log(`Tura należy do ${currentPlayer.name}`);
  }
}
