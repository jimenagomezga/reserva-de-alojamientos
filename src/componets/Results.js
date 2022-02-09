import "../styles/Styles.css";
import { hotelsData } from "../means/data";
import HotelCard from "../componets/HotelCard";

export default function Results(props) {
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

  return (
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
          src="../images/lo-sentimos.png"
          alt="lo sentimos"
        />
      )}
    </div>
  );
}
