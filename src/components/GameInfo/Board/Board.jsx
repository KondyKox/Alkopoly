import React, { useEffect, useState } from "react";
import ChanceCard from "../ChanceCard/ChanceCard";
import PropertyCard from "../PropertyCard/PropertyCard";
import chanceCardData from "../../../data/ChanceCardData.json";
import propertyData from "../../../data/propertyData.json";
import "./Board.css";

const Board = ({ currentPlayer, onWinner, onNextPlayer }) => {
  const [board, setBoard] = useState(Array(32).fill(null));
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPropertyCardVisible, setPropertyCardVisibility] = useState(false);

  // Random possition for fields on the board
  const initializeBoard = () => {
    const shuffledProperties = [
      { name: "Start", type: "start", image: "./properties/start.png" },
      ...propertyData.slice(1).sort(() => Math.random() - 0.5),
      {
        name: "Izba Wytrzeźwień",
        type: "jail",
        image: "./properties/start.png",
      },
    ];

    setBoard(shuffledProperties);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  // Check winner
  const checkWinner = (board) => {};

  // Handle click on board
  const handlePropertyClick = (index) => {
    setSelectedProperty(board[index]);
    setPropertyCardVisibility(true);
  };

  // Close Property Card
  const handlePropertyCardClose = () => {
    setPropertyCardVisibility(false);
  };

  // Handle Chance Card Draw
  const handleChanceCardDraw = () => {
    console.log("Karta narysowana.");
  };

  // Render Chance Cards
  const renderChanceCards = () => {
    return chanceCardData.map((card, index) => (
      <ChanceCard
        key={index}
        name={card.name}
        text={card.text}
        action={card.action}
        imgSrc={card.image}
        onDraw={handleChanceCardDraw}
      />
    ));
  };

  // Render Board
  const renderBoard = () => {
    const cols = 11;
    const fieldsInCol = 7;

    const renderCol = (startIndex, isFullRow = false) => (
      <div key={startIndex} className="board-col">
        {Array.from({ length: fieldsInCol }).map((_, index) => {
          const cellIndex = startIndex + index;

          if (!isFullRow && index > 0 && index < fieldsInCol - 1) return null;

          return (
            <div
              key={cellIndex}
              className={`board-cell ${
                board[cellIndex] ? "property" : "empty"
              }`}
              onClick={() => handlePropertyClick(cellIndex)}
            >
              {board[cellIndex] && (
                <>
                  <img
                    className="property-image"
                    src={board[cellIndex]?.image}
                    alt={board[cellIndex]?.name}
                  />
                  <div className="property-name">{board[cellIndex]?.name}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );

    return (
      <div className="board">
        <div className="logo-container">
          <img className="logo-board" src="./logo.png" alt="Logo Alkopoly" />
        </div>

        {Array.from({ length: cols }).map((_, rowIndex) => {
          const isFullRow = rowIndex === 0 || rowIndex === cols - 1;
          return renderCol(rowIndex, isFullRow);
        })}
      </div>
    );
  };

  return (
    <>
      {renderBoard()}
      {isPropertyCardVisible && selectedProperty && (
        <PropertyCard
          property={selectedProperty}
          onClose={handlePropertyCardClose}
        />
      )}
      {/* {renderChanceCards()} */}
    </>
  );
};

export default Board;
