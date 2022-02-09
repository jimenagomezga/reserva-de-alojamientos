import "../styles/Heder.css";
import { formatoFecha } from "../helper/helpers";

export default function Header(props) {
  const fechaInicial = () => {
    props.actualizarFechaHasta("");
  };

  const fechasValidas = () => {
    return props.desde === "" || props.hasta === "" || props.desde < hasta;
  };

  return (
    <header className="header">
      <h1 className="main-title">Hoteles</h1>
      {props.desde !== "" && props.hasta !== "" ? (
        fechasValidas() ? (
          <h1 className="Subtitle">
            Desde el día {formatoFecha(props.desde)} hasta el día{" "}
            {formatoFecha(props.hasta)} en {props.pais} - {props.tamaño}
          </h1>
        ) : (
          (fechaInicial(),
          window.alert("La fecha que ingresaste no es valida para la busqueda"))
        )
      ) : (
        <></>
      )}
    </header>
  );
}
