import React, { useState } from "react";
import "./PlayerRegistration.css";

const PlayerRegistration = ({ onPlayerRegister, currentNickname }) => {
  const [playerName, setPlayerName] = useState(currentNickname || "");

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleRegisterClick = () => {
    if (playerName.trim() !== "" && !currentNickname) {
      onPlayerRegister(playerName);

      setPlayerName("");
      setPlayerName("");
    } else if (playerName.trim() !== "" && currentNickname) {
      onPlayerRegister(playerName, currentNickname);
      setPlayerName("");
    }
  };

  return (
    <div className="player-registration">
      <img className="logo" src="./logo.png" alt="Logo Alkopoly" />
      <input
        type="text"
        value={playerName}
        onChange={handleNameChange}
        placeholder={currentNickname ? "Zmien nick" : "Dawaj nick mordeczko"}
      />
      <button className="btn" onClick={handleRegisterClick}>
        {currentNickname ? "Zmień nick" : "Dołącz do gry"}
      </button>
    </div>
  );
};

export default PlayerRegistration;
