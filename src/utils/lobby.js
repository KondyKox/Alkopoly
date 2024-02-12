import { gameState } from "../main";

const registeredPlayers = document.querySelector(".registered-players");

// Render players in lobby
export default function renderPlayersInLobby() {
  registeredPlayers.innerHTML = "";

  const playerKeys = Object.keys(gameState.players);
  playerKeys.forEach((playerKey) => {
    const player = gameState.players[playerKey];

    const li = document.createElement("li");
    li.className = "lobby__player";

    // Player name
    const name = document.createElement("span");
    name.className = "lobby__player-name";
    name.textContent = player.name;

    // Player img
    const img = document.createElement("img");
    img.className = "lobby__player-img";
    img.src = player.pawn;
    img.alt = player.name;

    // Player background color
    li.style.backgroundColor = player.color;

    li.appendChild(name);
    li.appendChild(img);
    registeredPlayers.appendChild(li);
  });
}
