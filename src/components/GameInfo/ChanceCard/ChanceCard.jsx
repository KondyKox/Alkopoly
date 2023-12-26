import React from "react";
import "./ChanceCard.css";

const ChanceCard = ({ name, text, action, imgSrc, onDraw }) => {
  const handleCardClick = () => {
    console.log("Kliknięta karta:", name);

    onDraw();
  };

  return (
    <div className="chance-card" onClick={handleCardClick}>
      <h4 className="card-title">{name}</h4>
      <img src={imgSrc} alt={name} />
      <p className="card-description">{text}</p>
      <p className="card-action">{action}</p>
    </div>
  );
};

export default ChanceCard;
