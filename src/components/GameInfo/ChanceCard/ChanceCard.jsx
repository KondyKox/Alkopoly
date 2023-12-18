import React from "react";
import "./ChanceCard.css";

const ChanceCard = ({ name, text, imgSrc }) => {
  return (
    <div className="chance-card">
      <h4 className="card-title">{name}</h4>
      <img src={imgSrc} alt="Karta szansy" />
      <p className="card-description">{text}</p>
    </div>
  );
};

export default ChanceCard;
