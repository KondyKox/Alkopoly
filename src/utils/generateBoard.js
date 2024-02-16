import { board } from "../classes/Property";
import { gameState } from "../main";
import Property from "../classes/Property";

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

// Create Property Elements
function createPropertyElements(property) {
  // Property image
  const cellImg = document.createElement("img");
  cellImg.src = property.image.src;
  cellImg.alt = property.name;
  cellImg.classList.add("property-image");

  // Property name
  const cellName = document.createElement("div");
  cellName.classList.add("property-name");
  cellName.textContent = property.name;

  return [cellImg, cellName];
}

// Generate board
export default function generateBoard() {
  const shuffledBoard = shuffleBoard();
  gameState.initializeBoard(shuffledBoard);

  for (let i = 0; i < shuffledBoard.length; i++) {
    const cell = document.querySelector(`#c${i + 1}`);
    cell.style.backgroundColor = shuffledBoard[i].background;

    const property = shuffledBoard[i];
    const [cellImg, cellName] = createPropertyElements(property);

    // Add elements to cell
    cell.appendChild(cellImg);
    cell.appendChild(cellName);

    cell.addEventListener("click", () =>
      Property.displayPropertyCard(shuffledBoard[i])
    );
  }
}

export function updateBoard(player) {
  for (let i = 0; i < gameState.board.length; i++) {
    const cell = document.querySelector(`#c${i + 1}`);

    // Find current field and change color
    if (cell.style.backgroundColor !== gameState.board[i].background) {
      cell.style.backgroundColor = gameState.board[i].background;

      // Remove old field
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }

      const property = gameState.board[i];
      const [cellImg, cellName] = createPropertyElements(property);

      // Add elements to cell
      cell.appendChild(cellImg);
      cell.appendChild(cellName);

      cell.addEventListener("click", () =>
        Property.displayPropertyCard(gameState.board[i])
      );

      player.draw();
    }
  }
}
