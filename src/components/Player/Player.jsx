import React from "react";
import "./Player.css";

const Player = ({ color, position, photo }) => {
  const playerStyle = {
    backgroundColor: color,
  };

  return (
    <div className="player" style={playerStyle}>
      {photo ? <img src={photo} alt="Player" /> : position}
    </div>
  );
};

export default Player;
