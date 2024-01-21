// Styles
import "../styles/style.css";
import "../styles/utils.css";
import "../styles/components/board.css";
import "../styles/components/propertyCard.css";
import "../styles/components/sideMenu.css";
import "../styles/components/chanceCard.css";
import "../styles/components/player.css";
import "../styles/components/userInput.css";

// JS
import Player from "./classes/Player";
import generateBoard from "./utils/generateBoard";
import "./utils/sideMenu";
import "./utils/pawnList";

// Socket.io
import "https://cdn.socket.io/4.7.4/socket.io.min.js";

const socket = io("http://localhost:5173");
const frontendPlayers = {};

socket.on("updatePlayers", (backendPlayers) => {
  console.log(backendPlayers);
  for (const id in backendPlayers) {
    const backendPlayer = backendPlayers[id];

    if (!frontendPlayers[id])
      frontendPlayers[id] = new Player(
        backendPlayer.name,
        backendPlayer.pawn,
        backendPlayer.position
      );

    frontendPlayers[id].draw();

    for (const id in frontendPlayers) {
      if (!backendPlayers[id]) delete frontendPlayers[id];
    }
  }
});

// Submit user
document.querySelector("#userForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#userForm").style.display = "none";

  socket.emit(
    "initGame",
    document.querySelector("#usernameInput").value,
    document.querySelector(".selectedPawn").querySelector(".playerPhoto").src
  );
});

generateBoard();
