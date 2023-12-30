import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ property, onClose }) => {
  return (
    <div className="property-card">
      <button className="property-close" onClick={onClose}>
        x
      </button>
      <h2 className="property-title">{property.name}</h2>
      <img className="property-img" src={property.image} alt={property.name} />
      <span className="property-value">
        {property.name === "Start" ? (
          <span>
            Za przejście przez <span className="property-price">START</span>{" "}
            dostajesz <span className="property-price">100zl.</span>
          </span>
        ) : property.type === "jail" ? (
          <span>
            Izba Wytrzeźwień. Tu zostaniesz zamknięty.
          </span>
        ) : (
          <>
            Cena: <span className="property-price">{property.price}</span> zł
          </>
        )}
      </span>
    </div>
  );
};

export default PropertyCard;
