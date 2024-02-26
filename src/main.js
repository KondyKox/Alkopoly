// Styles
import "../styles/style.css";
import "../styles/utils.css";
import "../styles/components/board.css";
import "../styles/components/board-mobile.css";
import "../styles/components/propertyCard.css";
import "../styles/components/sideMenu.css";
import "../styles/components/chanceCard.css";
import "../styles/components/player.css";
import "../styles/components/userInput.css";
import "../styles/components/lobby.css";

// JS
import GameState from "./classes/GameState";
import Player from "./classes/Player";
import generateBoard, { boardContainer } from "./utils/board";
import renderPlayersInLobby from "./utils/lobby";
import "./utils/sideMenu";
import "./utils/pawnList";
import BoardManager from "./classes/PlayerManagers/BoardManager";

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
boardContainer
  .querySelector(".dice-container")
  .addEventListener("click", () => {
    gameState.rollDice();
  });

// Click board cell to go there
const cells = document.querySelectorAll(".board-cell");
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Handle click to drive
function handleCellClick(event) {
  let target = event.target;
  while (target !== null && !target.classList.contains("board-cell"))
    target = target.parentNode;

  const cellId = target.id;
  const newPossition = cellId.match(/\d+/);

  const player = gameState.getCurrentPlayer();

  if (player.hasPolowka) {
    player.clearPlayerFromCell();
    player.position = parseInt(newPossition[0]);
    player.draw();
    player.hasPolowka = false;
    BoardManager.checkCurrentField(player);
  } else console.log(`${player.name} nie ma polówki.`);
}

generateBoard();
