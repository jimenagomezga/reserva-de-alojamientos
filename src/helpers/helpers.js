const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function formatoFecha(seleccion) {
  let fecha = new Date(seleccion);
  let diaDeLaSemana = dias[fecha.getDay()];
  let diaDelMes = fecha.getDate() + 1;
  let mes = meses[fecha.getMonth()];
  let año = fecha.getFullYear();
  return `${diaDeLaSemana} ${diaDelMes} de ${mes} del ${año}`;
}

export function formatoFechaInput(seleccion) {
  let fecha = new Date(seleccion);
  let diaDelMes =
    fecha.getDate() + 1 < 10 ? `0${fecha.getDate() + 1}` : fecha.getDate() + 1;
  let mes =
    fecha.getMonth() + 1 < 10
      ? `0${fecha.getMonth() + 1}`
      : fecha.getMonth() + 1;
  let año = fecha.getFullYear();
  return `${año}-${mes}-${diaDelMes}`;
}
