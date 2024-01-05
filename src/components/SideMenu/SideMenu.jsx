import React, { useState } from "react";
import pionkiData from "../../data/pionkiData.json";
import "./SideMenu.css";

const SideMenu = ({ isOpen, onClose, players, isGameStarted }) => {
  const [selectedPionek, setSelectedPionek] = useState(null);

  const handlePionekClick = (pionek, playerIndex) => {
    if (!isGameStarted) setSelectedPionek(pionek);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        x
      </button>
      <h3 className="menu-title">
        <img src="./logo.png" alt="Logo Alkopoly" />
      </h3>

      {isGameStarted ? (
        // Side Menu in Game
        players.map((player, index) => <li key={index}>{player}</li>)
      ) : (
        // Side Menu in Lobby
        <>
          <h3 className="lobby__menu__title">Pionki:</h3>
          <ul>
            {pionkiData.map((pionek) => (
              <li
                key={pionek.id}
                className={`pionek ${
                  selectedPionek === pionek ? "selectedPionek" : ""
                }`}
                onClick={() => handlePionekClick(pionek, 0)}
              >
                <img
                  className="playerPhoto"
                  src={pionek.image}
                  alt={pionek.name}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SideMenu;
