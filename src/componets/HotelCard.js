import React from "react";
import "../styles/HotelCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

export default function HotelCard(props) {
  return (
    <div className="cards">
      <img src={props.photo} alt={props.name} className="imagen-card" />
      <h2 className="tituloCard">{props.name}</h2>
      <p className="infodescripcion">{props.description}</p>
      <div className="infogeneral">
        <div className="ubicacion-franja">
          <img className="icono-pin" src="/images/locationPin.svg" alt="" />
          <h4 className="ubicacion">
            {props.city}, {props.country}
          </h4>
        </div>
        <div className="habitaciones-franja">
          <img className="icono-pin" src="/images/bed.svg" width="6%" alt="" />
          <h4 className="habitaciones">{props.rooms} habitaciones </h4>
          <div className="precio">
            {[...Array(props.price)].map((val, index) => (
              <FontAwesomeIcon
                key={index}
                className="icono-dollar-color1"
                icon={faDollarSign}
              />
            ))}
            {[...Array(4 - props.price)].map((val, index) => (
              <FontAwesomeIcon
                key={index}
                className="icono-dollar-color2"
                icon={faDollarSign}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="btn-reservar">
        <button>Reservar</button>
      </div>
    </div>
  );
}
