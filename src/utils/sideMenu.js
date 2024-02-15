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
      const playerContainer = document.createElement("div");
      playerContainer.className = "player-container";
      playerContainer.style.backgroundColor = player.color;

      // Player element
      const li = document.createElement("li");
      li.className = "player-info";

      // Player pawn
      const playerPawn = document.createElement("img");
      playerPawn.className = "player-info-pawn";
      playerPawn.src = player.pawn;
      playerPawn.alt = player.name;
      playerPawn.loading = "lazy";

      // Player name
      const playerName = document.createElement("span");
      playerName.className = "player-info-name";
      playerName.textContent = player.name;

      // Player money
      const playerMoney = document.createElement("span");
      playerMoney.className = "player-info-money";
      playerMoney.textContent = `${player.money}zł`;

      // Player properties on hover
      const playerProperties = document.createElement("ul");
      playerProperties.className = "player-properties";

      Object.values(player.properties).forEach((property) => {
        const playerProperty = document.createElement("li");
        playerProperty.className = "player-property";

        // Property name
        const playerPropertyName = document.createElement("span");
        playerPropertyName.className = "player-property-name";
        playerPropertyName.textContent = property.name;

        // Property image
        const playerPropertyImg = document.createElement("img");
        playerPropertyImg.className = "player-property-img";
        playerPropertyImg.src = property.image.src;
        playerPropertyImg.alt = property.name;
        playerPropertyImg.loading = "lazy";

        // Add elements
        playerProperty.appendChild(playerPropertyImg);
        playerProperty.appendChild(playerPropertyName);

        playerProperties.appendChild(playerProperty);
      });

      li.appendChild(playerPawn);
      li.appendChild(playerName);
      li.appendChild(playerMoney);

      playerContainer.appendChild(li);
      playerContainer.appendChild(playerProperties);

      playersList.appendChild(playerContainer);

      gameState.currentPlayerStyle(player.name);
    });
  };

  menuToggle.addEventListener("click", () => {
    toggleMenu();
    renderPlayersList();
  });
  closeBtn.addEventListener("click", toggleMenu);
});
