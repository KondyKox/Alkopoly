import React, { useEffect, useState } from "react";
import ChanceCard from "../ChanceCard/ChanceCard";
import chanceCardData from "../../../data/ChanceCardData.json";
import propertyData from "../../../data/propertyData.json";
import "./Board.css";

const Board = ({ currentPlayer, onWinner, onNextPlayer }) => {
  const [board, setBoard] = useState(Array(40).fill(null));

  // Random possition for fields on the board
  const initializeBoard = () => {
    const shuffledProperties = [
      { name: "Start", type: "start" },
      ...propertyData.slice(1).sort(() => Math.random() - 0.5),
    ];

    setBoard(shuffledProperties);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  // Random chance card
  const drawChanceCard = () => {};

  // Check winner
  const checkWinner = (board) => {};

  // Handle click on board
  const handleClick = (index) => {};

  // Handle Chance Card Draw
  const handleChanceCardDraw = () => {
    console.log("Karta narysowana.");
  };

  // Render Chance Cards
  const renderChanceCards = () => {
    return chanceCardData.map((card, index) => {
      <ChanceCard
        key={index}
        name={card.name}
        text={card.text}
        imgSrc={card.image}
        onDraw={handleChanceCardDraw}
      />;
    });
  };

  return (
    <div className="board">
      {renderChanceCards()}
      {board.map((property, index) => (
        <div
          key={index}
          className={`board-cell ${property?.type}`}
          onClick={() => handleClick(index)}
        >
          {property?.name}
          {property?.type === "fine" && `(${property?.amount} zł)`}
        </div>
      ))}
    </div>
  );
};

export default Board;
