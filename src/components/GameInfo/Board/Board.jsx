import React, { useEffect, useState } from "react";
import ChanceCard from "../ChanceCard/ChanceCard";
import PropertyCard from "../PropertyCard/PropertyCard";
import Player from "../Player/Player";
import Dice from "../Dice/Dice";
import chanceCardData from "../../../data/ChanceCardData.json";
import propertyData from "../../../data/propertyData.json";
import "./Board.css";

const Board = ({
  players,
  setPlayers,
  currentPlayer,
  onWinner,
  onNextPlayer,
  socket,
}) => {
  const [board, setBoard] = useState(Array(32).fill(null));
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPropertyCardVisible, setPropertyCardVisibility] = useState(false);
  const [diceResult, setDiceResult] = useState(null);

  // Random possition for fields on the board
  const initializeBoard = () => {
    const shuffledProperties = [
      { name: "Start", type: "start", image: "./properties/start.png" },
      ...propertyData.slice(1).sort(() => Math.random() - 0.5),
    ];

    const jailIndex = shuffledProperties.findIndex(
      (property) => property.type === "jail"
    );
    const jailProperty = shuffledProperties.splice(jailIndex, 1)[0];
    shuffledProperties.push(jailProperty);

    setBoard(shuffledProperties);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  // Render players on board
  const renderPlayers = () => {
    return players.map((player, index) => {
      const playerPosition = (player.position % 32) + 1;
      const playerPawn = player.pawn;
      const playerName = player.name;

      return (
        <Player
          key={index}
          position={playerPosition}
          pawn={playerPawn}
          name={playerName}
        />
      );
    });
  };

  // Roll dice
  const handleDiceRoll = (result) => {
    setDiceResult(result);

    const updatedPlayers = players.map((player) => {
      if (player === currentPlayer) {
        const newPosition = ((player.position + result) % 32) + 1;
        if (newPosition > 32) newPosition = newPosition - 32;

        setPlayers((prevPlayers) =>
          prevPlayers.map((prevPlayer) =>
            prevPlayer === currentPlayer
              ? { ...prevPlayer, position: newPosition }
              : prevPlayer
          )
        );

        socket.emit("updatePlayerPosition", { newPosition });
      }
      return player;
    });

    onNextPlayer(updatedPlayers);
  };

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
    const renderCol = () => {
      return (
        <>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c1"
              className="board-cell"
              onClick={() => handlePropertyClick(0)}
            >
              <img
                className="property-image"
                src={board[0]?.image}
                alt={board[0]?.name}
              />
              <div className="property-name">{board[0]?.name}</div>
            </div>
            <div
              id="c2"
              className="board-cell"
              onClick={() => handlePropertyClick(1)}
            >
              <img
                className="property-image"
                src={board[1]?.image}
                alt={board[1]?.name}
              />
              <div className="property-name">{board[1]?.name}</div>
            </div>
            <div
              id="c3"
              className="board-cell"
              onClick={() => handlePropertyClick(2)}
            >
              <img
                className="property-image"
                src={board[2]?.image}
                alt={board[2]?.name}
              />
              <div className="property-name">{board[2]?.name}</div>
            </div>
            <div
              id="c4"
              className="board-cell"
              onClick={() => handlePropertyClick(3)}
            >
              <img
                className="property-image"
                src={board[3]?.image}
                alt={board[3]?.name}
              />
              <div className="property-name">{board[3]?.name}</div>
            </div>
            <div
              id="c5"
              className="board-cell"
              onClick={() => handlePropertyClick(4)}
            >
              <img
                className="property-image"
                src={board[4]?.image}
                alt={board[4]?.name}
              />
              <div className="property-name">{board[4]?.name}</div>
            </div>
            <div
              id="c6"
              className="board-cell"
              onClick={() => handlePropertyClick(5)}
            >
              <img
                className="property-image"
                src={board[5]?.image}
                alt={board[5]?.name}
              />
              <div className="property-name">{board[5]?.name}</div>
            </div>
            <div
              id="c7"
              className="board-cell"
              onClick={() => handlePropertyClick(6)}
            >
              <img
                className="property-image"
                src={board[6]?.image}
                alt={board[6]?.name}
              />
              <div className="property-name">{board[6]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c32"
              className="board-cell"
              onClick={() => handlePropertyClick(7)}
            >
              <img
                className="property-image"
                src={board[7]?.image}
                alt={board[7]?.name}
              />
              <div className="property-name">{board[7]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c8"
              className="board-cell"
              onClick={() => handlePropertyClick(8)}
            >
              <img
                className="property-image"
                src={board[8]?.image}
                alt={board[8]?.name}
              />
              <div className="property-name">{board[8]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c31"
              className="board-cell"
              onClick={() => handlePropertyClick(9)}
            >
              <img
                className="property-image"
                src={board[9]?.image}
                alt={board[9]?.name}
              />
              <div className="property-name">{board[9]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c9"
              className="board-cell"
              onClick={() => handlePropertyClick(10)}
            >
              <img
                className="property-image"
                src={board[10]?.image}
                alt={board[10]?.name}
              />
              <div className="property-name">{board[10]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c30"
              className="board-cell"
              onClick={() => handlePropertyClick(11)}
            >
              <img
                className="property-image"
                src={board[11]?.image}
                alt={board[11]?.name}
              />
              <div className="property-name">{board[11]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c10"
              className="board-cell"
              onClick={() => handlePropertyClick(12)}
            >
              <img
                className="property-image"
                src={board[12]?.image}
                alt={board[12]?.name}
              />
              <div className="property-name">{board[12]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c29"
              className="board-cell"
              onClick={() => handlePropertyClick(13)}
            >
              <img
                className="property-image"
                src={board[13]?.image}
                alt={board[13]?.name}
              />
              <div className="property-name">{board[13]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c11"
              className="board-cell"
              onClick={() => handlePropertyClick(14)}
            >
              <img
                className="property-image"
                src={board[14]?.image}
                alt={board[14]?.name}
              />
              <div className="property-name">{board[14]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c28"
              className="board-cell"
              onClick={() => handlePropertyClick(15)}
            >
              <img
                className="property-image"
                src={board[15]?.image}
                alt={board[15]?.name}
              />
              <div className="property-name">{board[15]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c12"
              className="board-cell"
              onClick={() => handlePropertyClick(16)}
            >
              <img
                className="property-image"
                src={board[16]?.image}
                alt={board[16]?.name}
              />
              <div className="property-name">{board[16]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c27"
              className="board-cell"
              onClick={() => handlePropertyClick(17)}
            >
              <img
                className="property-image"
                src={board[17]?.image}
                alt={board[17]?.name}
              />
              <div className="property-name">{board[17]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c13"
              className="board-cell"
              onClick={() => handlePropertyClick(18)}
            >
              <img
                className="property-image"
                src={board[18]?.image}
                alt={board[18]?.name}
              />
              <div className="property-name">{board[18]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c26"
              className="board-cell"
              onClick={() => handlePropertyClick(19)}
            >
              <img
                className="property-image"
                src={board[19]?.image}
                alt={board[19]?.name}
              />
              <div className="property-name">{board[19]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c14"
              className="board-cell"
              onClick={() => handlePropertyClick(20)}
            >
              <img
                className="property-image"
                src={board[20]?.image}
                alt={board[20]?.name}
              />
              <div className="property-name">{board[20]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c25"
              className="board-cell"
              onClick={() => handlePropertyClick(21)}
            >
              <img
                className="property-image"
                src={board[21]?.image}
                alt={board[21]?.name}
              />
              <div className="property-name">{board[21]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c15"
              className="board-cell"
              onClick={() => handlePropertyClick(22)}
            >
              <img
                className="property-image"
                src={board[22]?.image}
                alt={board[22]?.name}
              />
              <div className="property-name">{board[22]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c24"
              className="board-cell"
              onClick={() => handlePropertyClick(23)}
            >
              <img
                className="property-image"
                src={board[23]?.image}
                alt={board[23]?.name}
              />
              <div className="property-name">{board[23]?.name}</div>
            </div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div className="board-cell empty"></div>
            <div
              id="c16"
              className="board-cell"
              onClick={() => handlePropertyClick(24)}
            >
              <img
                className="property-image"
                src={board[24]?.image}
                alt={board[24]?.name}
              />
              <div className="property-name">{board[24]?.name}</div>
            </div>
          </div>
          {/* Board column */}
          <div className="board-col">
            <div
              id="c23"
              className="board-cell"
              onClick={() => handlePropertyClick(25)}
            >
              <img
                className="property-image"
                src={board[25]?.image}
                alt={board[25]?.name}
              />
              <div className="property-name">{board[25]?.name}</div>
            </div>
            <div
              id="c22"
              className="board-cell"
              onClick={() => handlePropertyClick(26)}
            >
              <img
                className="property-image"
                src={board[26]?.image}
                alt={board[26]?.name}
              />
              <div className="property-name">{board[26]?.name}</div>
            </div>
            <div
              id="c21"
              className="board-cell"
              onClick={() => handlePropertyClick(27)}
            >
              <img
                className="property-image"
                src={board[27]?.image}
                alt={board[27]?.name}
              />
              <div className="property-name">{board[27]?.name}</div>
            </div>
            <div
              id="c20"
              className="board-cell"
              onClick={() => handlePropertyClick(28)}
            >
              <img
                className="property-image"
                src={board[28]?.image}
                alt={board[28]?.name}
              />
              <div className="property-name">{board[28]?.name}</div>
            </div>
            <div
              id="c19"
              className="board-cell"
              onClick={() => handlePropertyClick(29)}
            >
              <img
                className="property-image"
                src={board[29]?.image}
                alt={board[29]?.name}
              />
              <div className="property-name">{board[29]?.name}</div>
            </div>
            <div
              id="c18"
              className="board-cell"
              onClick={() => handlePropertyClick(30)}
            >
              <img
                className="property-image"
                src={board[30]?.image}
                alt={board[30]?.name}
              />
              <div className="property-name">{board[30]?.name}</div>
            </div>
            <div
              id="c17"
              className="board-cell"
              onClick={() => handlePropertyClick(31)}
            >
              <img
                className="property-image"
                src={board[31]?.image}
                alt={board[31]?.name}
              />
              <div className="property-name">{board[31]?.name}</div>
            </div>
          </div>
        </>
      );
    };

    return (
      <div className="board">
        <div className="logo-container">
          <img className="logo-board" src="./logo.png" alt="Logo Alkopoly" />
        </div>

        {renderPlayers()}

        {diceResult !== null && <div className="dice-result">{diceResult}</div>}

        <Dice onRoll={handleDiceRoll} />

        {renderCol()}
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
