import pawnsData from "../data/pawnsData.json";

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const sideMenu = document.querySelector(".side-menu");
  const closeBtn = document.querySelector(".close-button");
  const pawnsList = document.querySelector(".pawns-list");

  // Select pawn
  let selectedPawn = null;
  const selectPawn = (pawn) => {
    if (selectedPawn) selectedPawn.classList.remove("selectedPawn");
    pawn.classList.add("selectedPawn");
    selectedPawn = pawn;
  };

  // Render pawns in Side Menu
  const renderPawnsList = () => {
    pawnsList.innerHTML = "";
    pawnsData.forEach((pawn) => {
      const li = document.createElement("li");
      li.className = "pawn";

      const img = document.createElement("img");
      img.className = "playerPhoto";
      img.src = pawn.image;
      img.alt = pawn.name;
      img.loading = "lazy";

      li.addEventListener("click", () => selectPawn(li));

      li.appendChild(img);
      pawnsList.appendChild(li);
    });
  };

  renderPawnsList();

  // Toggle menu
  const toggleMenu = () => {
    sideMenu.classList.toggle("open");
  };

  menuToggle.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
});
