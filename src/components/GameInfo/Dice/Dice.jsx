import React from "react";
import "./Dice.css";

const Dice = ({ onRoll }) => {
  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    onRoll(result);
    console.log(result)
  };

  return (
    <div className="dice-container" onClick={rollDice}>
      <div className="dice">
        <img src="./game_pieces/dice/dice.png" alt="Dice" />
      </div>
    </div>
  );
};

export default Dice;
