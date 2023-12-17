import React from "react";
import "./Lobby.css";

const Lobby = ({ players }) => {
  return (
    <div className="lobby">
      <h2>Lobby</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <p>Czekamy na innych...</p>
    </div>
  );
};

export default Lobby;
