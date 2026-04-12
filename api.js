/**
 * api.js
 * Capa de peticiones — actualmente generación local sin endpoint externo.
 * Si en el futuro se necesita llamar a un servidor, este es el fichero a modificar.
 */

/**
 * Solicita la generación de códigos con los parámetros dados.
 * Devuelve una Promise para mantener la interfaz uniforme con futuras llamadas reales.
 *
 * @param {number}   hospital      ID del hospital
 * @param {number[]} habitaciones  Lista de habitaciones seleccionadas
 * @param {number}   tipoTicket    Tipo de ticket (0–7)
 * @param {number[]} cantidades    Lista de IDs de ticket (1–8)
 * @param {Date}     fecha         Fecha del ticket
 * @returns {Promise<{ habitacion, idTicket, codigo }[]>}
 */
function solicitarCodigos(hospital, habitaciones, tipoTicket, cantidades, fecha) {
  return Promise.resolve(
    generarCodigos(hospital, habitaciones, tipoTicket, cantidades, fecha)
  );
}
