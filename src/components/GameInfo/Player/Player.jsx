import React from "react";
import "./Player.css";

const Player = ({ position, pawn, name }) => {
  return (
    <div className="player">
      {pawn ? (
        <img className="player__pawn" src={pawn.image} alt={name} />
      ) : (
        position + 1
      )}
      <span className="player__name">{name}</span>
    </div>
  );
};

export default Player;
