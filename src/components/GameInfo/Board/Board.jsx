import React, { useState } from "react";
import "./Board.css";

const Board = ({ currentPlayer, onWinner, onNextPlayer }) => {
  const [board, setBoard] = useState(Array(9).fill(null));

  const checkWinner = (board) => {};

  // Handle click on board
  const handleClick = (index) => {};

  return (
    <div className="board">
      {board.map((value, index) => {
        <div
          key={index}
          className="board-cell"
          onClick={() => handleClick(index)}
        >
          {value}
        </div>;
      })}
    </div>
  );
};

export default Board;
