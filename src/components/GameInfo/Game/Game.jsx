import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import SideMenu from "../SideMenu/SideMenu";
import "./Game.css";

const Game = ({ players }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const checkWinner = (board) => {};

  const handleWinner = (winner) => {
    setWinner(winner);
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex(currentPlayerIndex + 1);
  };

  useEffect(() => {
    if (players.lenght < 2) {
      setWinner("Mało graczy = brak zwycięzcy");
    }
  }, [players]);

  return (
    <div className="game-container">
      {/* Open/Close side menu */}
      {!isSideMenuOpen ? (
        <button
          className="menu-toggle"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          ☰
        </button>
      ) : (
        ""
      )}

      {/* Render side menu */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        players={players}
      />

      {/* Board */}
      <h2 className="game__board-title">Gramy mordeczki!</h2>
      {winner ? (
        <div className="winner-message">{`Zwycięzca: ${winner}`}</div>
      ) : (
        <div className="current-player">
          Obecny gracz:{" "}
          <span className="current-player-nick">
            {players[currentPlayerIndex % players.lenght]}
          </span>
        </div>
      )}
      <Board
        currentPlayer={players[currentPlayerIndex % players.lenght]}
        onWinner={handleWinner}
        onNextPlayer={handleNextPlayer}
      />
    </div>
  );
};

export default Game;
