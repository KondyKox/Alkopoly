import React from "react";
import "./SideMenu.css";

const SideMenu = ({ isOpen, onClose, players }) => {
  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        x
      </button>
      <h3 className="menu-title">Menu</h3>
      <ul>
        {players.map((player, index) => {
          <li key={index}>{player}</li>;
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
