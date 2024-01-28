import { gameState } from "../main";

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const sideMenu = document.querySelector(".side-menu");
  const closeBtn = document.querySelector(".close-button");
  const playersList = document.querySelector(".players-list");

  // Toggle menu
  const toggleMenu = () => {
    sideMenu.classList.toggle("open");
  };

  // Render players list in side menu
  const renderPlayersList = () => {
    playersList.innerHTML = "";
    Object.values(gameState.players).forEach((player) => {
      const li = document.createElement("li");
      li.className = "player-info";
      li.style.backgroundColor = player.color;

      const playerPawn = document.createElement("img");
      playerPawn.className = "player-info-pawn";
      playerPawn.src = player.pawn;
      playerPawn.alt = player.name;
      playerPawn.loading = "lazy";

      const playerName = document.createElement("span");
      playerName.className = "player-info-name";
      playerName.textContent = player.name;

      const playerMoney = document.createElement("span");
      playerMoney.className = "player-info-money";
      playerMoney.textContent = `${player.money}zł`;

      li.appendChild(playerPawn);
      li.appendChild(playerName);
      li.appendChild(playerMoney);
      playersList.appendChild(li);
    });
  };

  menuToggle.addEventListener("click", () => {
    toggleMenu();
    renderPlayersList();
  });
  closeBtn.addEventListener("click", toggleMenu);
});
