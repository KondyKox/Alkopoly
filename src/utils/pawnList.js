import pawnsData from "../data/pawnsData.json";

document.addEventListener("DOMContentLoaded", function () {
  const pawnsList = document.querySelector(".pawns-list");

  // Select pawn
  let selectedPawn = null;
  const selectPawn = (pawn) => {
    if (selectedPawn) selectedPawn.classList.remove("selectedPawn");
    pawn.classList.add("selectedPawn");
    selectedPawn = pawn;
  };

  // Render pawns in Pawn List
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
});
