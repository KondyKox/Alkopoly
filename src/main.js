// Styles
import "../styles/style.css";
import "../styles/utils.css";
import "../styles/components/board.css";
import "../styles/components/propertyCard.css";
import "../styles/components/sideMenu.css";
import "../styles/components/chanceCard.css";
import "../styles/components/player.css";
import "../styles/components/userInput.css";
import "../styles/components/lobby.css";

// JS
import GameState from "./classes/GameState";
import Player from "./classes/Player";
import generateBoard from "./utils/board";
import renderPlayersInLobby from "./utils/lobby";
import "./utils/sideMenu";
import "./utils/pawnList";

export const gameState = new GameState();

// Generate random player id
function generatePlayerId() {
  return Math.random().toString(36).substring(2, 10);
}

// Submit user
document.querySelector("#userForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector("#usernameInput");
  const selectedPawn = document.querySelector(".selectedPawn");

  const id = generatePlayerId();
  gameState.players[id] = new Player(
    id,
    usernameInput.value,
    selectedPawn.querySelector(".playerPhoto").src
  );

  usernameInput.value = "";
  selectedPawn.classList.remove("selectedPawn");

  renderPlayersInLobby();
});

// Start game
document.querySelector("#start").addEventListener("click", () => {
  document.querySelector(".lobby").style.display = "none";
  document.querySelector("#userForm").style.display = "none";

  Object.values(gameState.players).forEach((player) => {
    player.draw();
  });

  gameState.startGame();
});

// Roll dice on click
document.querySelector(".dice-container").addEventListener("click", () => {
  gameState.rollDice();
});

generateBoard();
