import React, { useState } from "react";
import pawnsData from "../../data/pawnsData.json";
import "./SideMenu.css";

const SideMenu = ({ isOpen, onClose, players, isGameStarted }) => {
  const [selectedPawn, setSelectedPawn] = useState(null);
  const [takenPawns, setTakenPawns] = useState([]);

  const handlePawnClick = (pawn) => {
    if (!takenPawns.includes(pawn)) {
      setSelectedPawn(pawn);
      setTakenPawns((prevTakenPawns) => [...prevTakenPawns, pawn]);
    }
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
            {pawnsData.map((pawn) => (
              <li
                key={pawn.id}
                className={`pionek ${
                  selectedPawn === pawn ? "selectedPionek" : ""
                }`}
                onClick={() => handlePawnClick(pawn, 0)}
              >
                <img className="playerPhoto" src={pawn.image} alt={pawn.name} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SideMenu;
