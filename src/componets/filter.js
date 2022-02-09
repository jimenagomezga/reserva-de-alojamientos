import "../styles/Filter.css";
import { hotelsData } from "../means/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faSignInAlt,
  faGlobe,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { formatoFechaInput } from "../helpers/helpers";

export default function Filter(props) {
  let fechaDesdeUNIX;
  let fechaHastaUNIX;

  //Fecha desde//
  const busquedaDesde = (evento) => {
    const fechaDesde = new Date(evento.target.value);
    fechaDesdeUNIX = fechaDesde.getTime();
    if (fechaHastaUNIX && fechaDesdeUNIX > fechaHastaUNIX) {
      alert("El rango de fechas no es válido");
      return;
    }
    props.actualizarFechaDesde(fechaDesdeUNIX);
    props.actualizarFechaDesdeHtml(formatoFechaInput(fechaDesdeUNIX));
  };

  //Fecha hasta//
  const busquedaHasta = (evento) => {
    const fechaHasta = new Date(evento.target.value);
    fechaHastaUNIX = fechaHasta.getTime();
    if (fechaDesdeUNIX && fechaDesdeUNIX < fechaHastaUNIX) {
      alert("El rango de fechas no es válido");
      return;
    }
    props.actualizarFechaHasta(fechaHastaUNIX);
    props.actualizarFechaHastaHtml(formatoFechaInput(fechaHastaUNIX));
  };

  //Pais//
  const onChangePais = (evento) => {
    props.actualizarPais(evento.target.value);
  };
  //Precio//
  const onChangePrecio = (evento) => {
    props.actualizarPrecio(evento.target.value);
  };

  //Tamaño//
  const onChangeTamaño = (evento) => {
    props.actualizarTamaño(evento.target.value);
  };

  let listaFiltrada = crearLista();

  const crearLista = () => {
    const nuevaLista = hotelsData
      .filter((hotel) => {
        if (props.desde !== "" && props.hasta !== "") {
          return (
            props.desde >= hotel.availabilityFrom &&
            props.hasta <= hotel.availabilityTo
          );
        }
        return hotel;
      })

      .filter((hotel) => {
        if (props.pais !== "Todos los paises") {
          return hotel.country === props.pais;
        }
        return hotel;
      })

      //filtro hotel//
      .filter((hotel) => {
        switch (props.precio) {
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
        switch (props.tamaño) {
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

  //Boton limpiar//

  const limpiarLista = () => {
    props.actualizarFechaDesde("");
    props.actualizarFechaHasta("");
    props.actualizarFechaDesdeHtml("");
    props.actualizarFechaHastaHtml("");
    props.actualizarPais("Todos los paises");
    props.actualizarPrecio("Cualquier precio");
    props.actualizarTamaño("Cualquier tamaño");
  };
  return (
    <nav className="nav">
      <div className="dates">
        <FontAwesomeIcon icon={faSignInAlt} className="icon-fecha" />
        <input
          className="date"
          type="date"
          value={props.desdeHtml}
          onChange={busquedaDesde}
        />
      </div>
      <div className="dates">
        <FontAwesomeIcon icon={faSignInAlt} className="icon-fecha" />
        <input
          className="date"
          type="date"
          value={props.hastaHtml}
          onChange={busquedaHasta}
        />
      </div>
      <div className="dates">
        <FontAwesomeIcon icon={faGlobe} className="icon-fecha" />
        <select className="date" value={props.pais} onChange={onChangePais}>
          <option value="Todos los paises">Todos los paises</option>
          <option value="Argentina">Argentina</option>
          <option value="Brasil">Brasil</option>
          <option value="Chile">Chile</option>
          <option value="Uruguay">Uruguay</option>
        </select>
      </div>
      <div className="dates">
        <FontAwesomeIcon icon={faDollarSign} className="icon-fecha" />
        <select className="date" value={props.precio} onChange={onChangePrecio}>
          <option value="Cualquier precio">Cualquier precio</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
      </div>
      <div className="dates">
        <FontAwesomeIcon icon={faBed} className="icon-fecha" />
        <select className="date" value={props.tamaño} onChange={onChangeTamaño}>
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
  );
}
