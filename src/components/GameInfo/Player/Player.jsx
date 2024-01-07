import React from "react";
import "./Player.css";

const Player = ({ position, pawn, name }) => {
  return (
    <div className="player" style={{ gridColumn: position + 1 }}>
      {pawn ? <img src={pawn.image} alt={name} /> : position + 1}
      <span>{name}</span>
    </div>
  );
};

export default Player;
