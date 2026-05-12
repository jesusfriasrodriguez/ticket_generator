/**
 * hospitales.js
 * Configuración de hospitales, plantas, pasillos y habitaciones.
 *
 * Cada hospital tiene un array de "secciones".
 * Cada sección tiene un nombre y un array de habitaciones.
 * El campo "id" corresponde al valor ADDRESS del fichero config/i9500.xml.
 */

function rango(desde, hasta) {
  const arr = [];
  for (let i = desde; i <= hasta; i++) arr.push(i);
  return arr;
}

const HOSPITALES = [
  {
    id: 1,
    nombre: 'Sierrallana',
    secciones: [
      { nombre: 'Planta 1 — Pasillo A', habitaciones: rango(101, 119) },
      { nombre: 'Planta 1 — Pasillo B', habitaciones: rango(401, 419) },
      { nombre: 'Planta 1 — Pasillo C', habitaciones: rango(701, 719) },
      { nombre: 'Planta 3 — Pasillo A', habitaciones: rango(301, 319) },
      { nombre: 'Planta 3 — Pasillo B', habitaciones: rango(601, 619) },
      { nombre: 'Planta 3 — Pasillo C', habitaciones: rango(901, 919) },
    ],
  },
  {
    id: 10,
    nombre: 'Laredo',
    secciones: [
      { nombre: 'Pasillo Azul',     habitaciones: rango(100, 135) },
      { nombre: 'Pasillo Amarillo', habitaciones: rango(500, 518) },
      { nombre: 'Pasillo Verde',    habitaciones: rango(701, 714) },
    ],
  },
  {
    id: 20,
    nombre: 'Santa Clotilde',
    secciones: [
      { nombre: 'Planta Baja', habitaciones: rango(7, 25) },
      { nombre: 'Planta 1',    habitaciones: rango(101, 152) },
    ],
  },
];
