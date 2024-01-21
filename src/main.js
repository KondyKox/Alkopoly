// Styles
import "../styles/style.css";
import "../styles/utils.css";
import "../styles/components/board.css";
import "../styles/components/propertyCard.css";
import "../styles/components/sideMenu.css";
import "../styles/components/chanceCard.css";
import "../styles/components/player.css";

// JS
import Player from "./classes/Player";
import generateBoard from "./utils/generateBoard";
import "./utils/sideMenu";

// Socket.io
import "https://cdn.socket.io/4.7.4/socket.io.min.js";

const socket = io("http://localhost:5173");
const players = {};

socket.on("updatePlayers", (backendPlayers) => {
  console.log(backendPlayers);
  for (const id in backendPlayers) {
    const backendPlayer = backendPlayers[id];

    if (!players[id])
      players[id] = new Player(
        backendPlayer.name,
        backendPlayer.pawn,
        backendPlayer.position
      );

    players[id].draw();

    for (const id in players) {
      if (!backendPlayers[id]) delete players[id];
    }
  }
});

generateBoard();
