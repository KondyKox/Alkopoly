import { board } from "../classes/Property";
import { gameState } from "../main";

// Shuffle board
function shuffleBoard() {
  const startProperty = board.find((property) => property.name === "Start");
  const jailProperty = board.find((property) => property.type === "jail");

  const shuffledBoard = board.filter(
    (property) => property !== startProperty && property !== jailProperty
  );

  shuffledBoard.sort(() => Math.random() - 0.5);

  // START on first possition
  shuffledBoard.unshift(startProperty);

  // JAIL on 17th possition (because it's in the bottom-right corner)
  shuffledBoard.splice(16, 0, jailProperty);

  return shuffledBoard;
}

// Generate board
export default function generateBoard() {
  const shuffledBoard = shuffleBoard();
  gameState.initializeBoard(shuffledBoard);

  for (let i = 0; i < shuffledBoard.length; i++) {
    const cell = document.querySelector(`#c${i}`);

    // Property image
    const cellImg = document.createElement("img");
    cellImg.src = shuffledBoard[i].image.src;
    cellImg.alt = shuffledBoard[i].name;
    cellImg.classList.add("property-image");

    // Property name
    const cellName = document.createElement("div");
    cellName.classList.add("property-name");
    cellName.textContent = shuffledBoard[i].name;

    // Add element to cell
    cell.appendChild(cellImg);
    cell.appendChild(cellName);

    cell.addEventListener("click", () => gameState.displayPropertyCard(shuffledBoard[i]));
  }
}
