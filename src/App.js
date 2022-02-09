import React, { useState } from "react";
import "./styles/Styles.css";
import { hotelsData } from "./means/data";
//import "./Componentes/HotelCard";//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faSignInAlt,
  faGlobe,
  faBed,
} from "@fortawesome/free-solid-svg-icons";

import { formatoFecha, formatoFechaInput } from "./helpers/helpers";
import HotelCard from "./componets/HotelCard";

export default function App() {
  const [pais, actualizarPais] = useState("Todos los paises");
  const [precio, actualizarPrecio] = useState("Todos los precios");
  const [tamaño, actualizarTamaño] = useState("Todos los tamaños");
  const [desde, actualizarFechaDesde] = useState("");
  const [hasta, actualizarFechaHasta] = useState("");
  const [desdeHtml, actualizarFechaDesdeHtml] = useState("");
  const [hastaHtml, actualizarFechaHastaHtml] = useState("");

  let fechaDesdeUNIX;
  let fechaHastaUNIX;

  const fechaInicial = () => {
    actualizarFechaHasta("");
  };

  const fechasValidas = () => {
    return desde === "" || hasta === "" || desde < hasta;
  };

  //Fecha desde//
  const busquedaDesde = (evento) => {
    const fechaDesde = new Date(evento.target.value);
    fechaDesdeUNIX = fechaDesde.getTime();
    if (fechaHastaUNIX && fechaDesdeUNIX > fechaHastaUNIX) {
      alert("El rango de fechas no es válido");
      return;
    }
    actualizarFechaDesde(fechaDesdeUNIX);
    actualizarFechaDesdeHtml(formatoFechaInput(fechaDesdeUNIX));
  };

  //Fecha hasta//
  const busquedaHasta = (evento) => {
    const fechaHasta = new Date(evento.target.value);
    fechaHastaUNIX = fechaHasta.getTime();
    if (fechaDesdeUNIX && fechaDesdeUNIX < fechaHastaUNIX) {
      alert("El rango de fechas no es válido");
      return;
    }
    actualizarFechaHasta(fechaHastaUNIX);
    actualizarFechaHastaHtml(formatoFechaInput(fechaHastaUNIX));
  };

  //Pais//
  const onChangePais = (evento) => {
    actualizarPais(evento.target.value);
  };
  //Precio//
  const onChangePrecio = (evento) => {
    actualizarPrecio(evento.target.value);
  };

  //Tamaño//
  const onChangeTamaño = (evento) => {
    actualizarTamaño(evento.target.value);
  };

  const crearLista = () => {
    const nuevaLista = hotelsData
      .filter((hotel) => {
        if (desde !== "" && hasta !== "") {
          return (
            desde >= hotel.availabilityFrom && hasta <= hotel.availabilityTo
          );
        }
        return hotel;
      })

      .filter((hotel) => {
        if (pais !== "Todos los paises") {
          return hotel.country === pais;
        }
        return hotel;
      })

      //filtro hotel//
      .filter((hotel) => {
        switch (precio) {
          case "$":
            return hotel.price === 1;
          case "$$":
            return hotel.price === 2;
          case "$$$":
            return hotel.price === 3;
          case "$$$$":
            return hotel.price === 4;
          default:
            return hotel;
        }
      })

      //filtro tamaño//
      .filter((hotel) => {
        switch (tamaño) {
          case "Hotel pequeño":
            return hotel.rooms <= 15;
          case "Hotel mediano":
            return hotel.rooms > 15 && hotel.rooms <= 29;
          case "Hotel grande":
            return hotel.rooms >= 30;
          default:
            return hotel;
        }
      });
    return nuevaLista;
  };

  let listaFiltrada = crearLista();

  //Boton limpiar//

  const limpiarLista = () => {
    actualizarFechaDesde("");
    actualizarFechaHasta("");
    actualizarFechaDesdeHtml("");
    actualizarFechaHastaHtml("");
    actualizarPais("Todos los paises");
    actualizarPrecio("Cualquier precio");
    actualizarTamaño("Cualquier tamaño");
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="main-title">Hoteles</h1>
        {desde !== "" && hasta !== "" ? (
          fechasValidas() ? (
            <h1 className="Subtitle">
              Desde el día {formatoFecha(desde)} hasta el día{" "}
              {formatoFecha(hasta)} en {pais} - {tamaño}
            </h1>
          ) : (
            (fechaInicial(),
            window.alert(
              "La fecha que ingresaste no es valida para la busqueda"
            ))
          )
        ) : (
          <></>
        )}
      </header>
      <nav className="nav">
        <div className="dates">
          <FontAwesomeIcon icon={faSignInAlt} className="icon-fecha" />
          <input
            className="date"
            type="date"
            value={desdeHtml}
            onChange={busquedaDesde}
          />
        </div>
        <div className="dates">
          <FontAwesomeIcon icon={faSignInAlt} className="icon-fecha" />
          <input
            className="date"
            type="date"
            value={hastaHtml}
            onChange={busquedaHasta}
          />
        </div>
        <div className="dates">
          <FontAwesomeIcon icon={faGlobe} className="icon-fecha" />
          <select className="date" value={pais} onChange={onChangePais}>
            <option value="Todos los paises">Todos los paises</option>
            <option value="Argentina">Argentina</option>
            <option value="Brasil">Brasil</option>
            <option value="Chile">Chile</option>
            <option value="Uruguay">Uruguay</option>
          </select>
        </div>
        <div className="dates">
          <FontAwesomeIcon icon={faDollarSign} className="icon-fecha" />
          <select className="date" value={precio} onChange={onChangePrecio}>
            <option value="Cualquier precio">Cualquier precio</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
        </div>
        <div className="dates">
          <FontAwesomeIcon icon={faBed} className="icon-fecha" />
          <select className="date" value={tamaño} onChange={onChangeTamaño}>
            <option value="Cualquier tamaño">Cualquier tamaño</option>
            <option value="Hotel pequeño">Hotel pequeño</option>
            <option value="Hotel mediano">Hotel mediano</option>
            <option value="Hotel grande">Hotel grande</option>
          </select>
        </div>
        <button className="button-nav" onClick={limpiarLista}>
          Limpiar
        </button>
      </nav>
      <div className="contenedor-cards">
        {listaFiltrada.length > 0 ? (
          listaFiltrada.map((hotel) => (
            <HotelCard
              key={hotel.slug}
              slug={hotel.slug}
              name={hotel.name}
              photo={hotel.photo}
              description={hotel.description}
              rooms={hotel.rooms}
              city={hotel.city}
              country={hotel.country}
              price={hotel.price}
            />
          ))
        ) : (
          <img
            className="banner"
            src="/images/lo-sentimos.png"
            alt="lo sentimos"
          />
        )}
      </div>
    </div>
  );
}
