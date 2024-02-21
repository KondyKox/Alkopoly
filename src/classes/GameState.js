import { socket } from "../main";

export default class GameState {
  constructor() {
    this.players = {};
    this.playerIds = null;
    this.currentPlayerId = null;
    this.board = [];
    this.reward = 0;
    this.isGameStarted = false;
  }

  // Initialize board
  initializeBoard(shuffledBoard) {
    this.board = shuffledBoard;
  }

  // Get current player
  getCurrentPlayer() {
    socket.emit("updateCurrentPlayer", {
      gameState: this,
      currentPlayerId: this.currentPlayerId,
    });

    return this.players[this.currentPlayerId];
  }

  // Change current player title and border color in side menu
  currentPlayerStyle(currentPlayerName) {
    // Current player name in title
    const currentPlayerTitle = document.querySelector(".current-player__name");
    currentPlayerTitle.textContent = currentPlayerName;

    // Current player border color in side menu
    const playersInSideMenu = document.querySelectorAll(".player-container");
    playersInSideMenu.forEach((currentPlayerSideMenu) => {
      const playerName =
        currentPlayerSideMenu.querySelector(".player-info-name").textContent;

      if (playerName === currentPlayerName)
        currentPlayerSideMenu.style.borderColor = "var(--clr-red)";
      else currentPlayerSideMenu.style.borderColor = "var(--clr-blue)";
    });
  }

  // Start the game
  startGame() {
    this.isGameStarted = true;

    // Set reward to 0
    this.setReward(this.reward);

    // Set first player as the current player
    this.playerIds = Object.keys(this.players);
    this.currentPlayerId = this.playerIds[0];

    this.currentPlayerStyle(this.players[this.currentPlayerId].name);

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
    socket.emit("rollDice", {
      gameState: this,
      playerId: currentPlayer.id,
      steps: diceResult,
    });

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

    this.currentPlayerStyle(this.players[this.currentPlayerId].name);

    console.log(`Tura należy do ${currentPlayer.name}`);
  }

  // Change reward to win
  setReward(money) {
    this.reward += money;

    document.querySelector(".reward-money").innerText = this.reward;

    // socket.emit("updateReward");
  }
}
