import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import "./Game.css";

const Game = ({ players, setPlayers, socket }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  const handleWinner = (winner) => {
    setWinner(winner);
  };

  // Next player
  const handleNextPlayer = () => {
    if (currentPlayerIndex <= players.lenght - 1)
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    else setCurrentPlayerIndex(0);
  };

  useEffect(() => {
    if (players.lenght < 2) {
      setWinner("Mało graczy = brak zwycięzcy");
    }
  }, [players]);

  return (
    <div className="game-container">
      {/* Board */}
      <h2 className="game__board-title">Gramy mordeczki!</h2>
      {winner ? (
        <div className="winner-message">{`Zwycięzca: ${winner}`}</div>
      ) : (
        <div className="current-player">
          Obecny gracz:{" "}
          <span className="current-player-nick">
            {players[currentPlayerIndex % players.length].name}
          </span>
        </div>
      )}
      <Board
        players={players}
        setPlayers={setPlayers}
        currentPlayer={players[currentPlayerIndex % players.lenght]}
        onWinner={handleWinner}
        onNextPlayer={handleNextPlayer}
        socket={socket}
      />
    </div>
  );
};

export default Game;
