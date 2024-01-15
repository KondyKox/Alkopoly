import { board } from "../classes/BoardCell";

// Current Property Card
let currentPropertyCard = null;

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

  // JAIL on 17th possition
  shuffledBoard.splice(16, 0, jailProperty);

  return shuffledBoard;
}

// Generate board
export default function generateBoard() {
  const shuffledBoard = shuffleBoard();

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

    cell.addEventListener("click", () => propertyCard(shuffledBoard[i]));
  }
}

// Display property card
function propertyCard(property) {
  // If property card is open, close it
  if (currentPropertyCard) {
    document.body.removeChild(currentPropertyCard);
    currentPropertyCard = null;
  }

  const propertyCard = document.createElement("div");
  propertyCard.classList.add("property-card");

  // Close button
  const closeButton = document.createElement("button");
  closeButton.classList.add("property-close");
  closeButton.innerText = "x";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(propertyCard);
    currentPropertyCard = null;
  });

  // Property title
  const title = document.createElement("h2");
  title.classList.add("property-title");
  title.innerText = property.name;

  // Property image
  const image = document.createElement("img");
  image.classList.add("property-img");
  image.src = property.image;
  image.alt = property.name;

  const value = document.createElement("span");
  value.classList.add("property-value");

  if (property.name === "Start")
    value.innerHTML = `Za przejście przez <span class="property-price">START</span> dostajesz <span class="property-price">100zl.</span>`;
  else if (property.type === "jail")
    value.innerText = "Izba Wytrzeźwień. Tu zostaniesz zamknięty.";
  else
    value.innerHTML = `Cena: <span class="property-price">${property.price}</span> zł`;

  propertyCard.appendChild(closeButton);
  propertyCard.appendChild(title);
  propertyCard.appendChild(image);
  propertyCard.appendChild(value);

  document.body.appendChild(propertyCard);
  currentPropertyCard = propertyCard;
}
