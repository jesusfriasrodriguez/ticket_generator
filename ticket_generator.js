/**
 * ticket_generator.js
 * Lógica de generación de códigos de ticket.
 * Reconstruido desde Encriptadores.dll · TAU.ComponentsComuns.Basics.CD06
 *
 * PARÁMETROS:
 *   hospital   → id del hospital (de hospitales.js, valor ADDRESS de i9500.xml)
 *   tipoTicket → 0=1HORA, 1=1DÍA, 2=2DÍAS ... 7=7DÍAS
 *   cantidad   → valor mostrado al usuario (1–8); internamente se usa cantidad-1 (0–7)
 *   serie      → tipoTicket * 8 + (cantidad - 1)
 *
 * VERIFICADO: hospital=20, hab=10, tipoTicket=1, cantidad=5, 22/03/2026 → 15141813 ✓
 */

const _BITS = Array.from({ length: 32 }, (_, i) => 1 << i);

function _RB(ent, i, j, clau) {
  if (ent & _BITS[i]) clau += _BITS[j];
  return clau;
}

function _encod(hospital, habitacion, serie, dia, mes, ano) {
  let cript = 0, clau = 0;

  // Bloque 1
  clau = _RB(serie,      0, 24, clau);
  clau = _RB(serie,      1,  1, clau);
  clau = _RB(serie,      2, 22, clau);
  clau = _RB(serie,      3,  9, clau);
  clau = _RB(serie,      4, 15, clau);
  clau = _RB(habitacion, 0,  5, clau);
  clau = _RB(habitacion, 1,  7, clau);
  clau = _RB(habitacion, 2, 10, clau);
  clau = _RB(habitacion, 3, 17, clau);
  clau = _RB(habitacion, 4, 20, clau);
  clau = _RB(habitacion, 5,  3, clau);
  clau = _RB(habitacion, 6,  8, clau);
  clau = _RB(habitacion, 7, 13, clau);
  clau = _RB(habitacion, 8, 18, clau);
  clau = _RB(habitacion, 9, 23, clau);
  clau = _RB(dia,        0, 25, clau);
  clau = _RB(dia,        1, 21, clau);
  clau = _RB(dia,        2, 11, clau);
  clau = _RB(dia,        3, 14, clau);
  clau = _RB(dia,        4,  2, clau);
  clau = _RB(mes,        0, 16, clau);
  clau = _RB(mes,        1, 12, clau);
  clau = _RB(mes,        2,  6, clau);
  clau = _RB(mes,        3, 19, clau);
  clau = _RB(ano,        0,  4, clau);

  if ((serie & 0x20) === 0) clau = (clau | 0) ^ _BITS[0];
  cript = clau | 0;

  // Bloque 2
  clau = 0;
  clau = _RB(habitacion, 0,  6, clau);
  clau = _RB(habitacion, 0, 21, clau);
  clau = _RB(habitacion, 1,  4, clau);
  clau = _RB(habitacion, 1, 12, clau);
  clau = _RB(habitacion, 2, 19, clau);
  clau = _RB(habitacion, 4, 16, clau);
  cript = cript ^ (clau | 0);

  // Bloque 3
  clau = 0;
  clau = _RB(hospital, 0, 23, clau);
  clau = _RB(hospital, 1, 20, clau);
  clau = _RB(hospital, 2, 18, clau);
  clau = _RB(hospital, 3, 13, clau);
  clau = _RB(hospital, 4,  8, clau);
  clau = _RB(hospital, 5,  7, clau);
  clau = _RB(hospital, 6,  5, clau);
  clau = _RB(hospital, 7,  3, clau);
  cript = cript ^ (clau | 0);

  if ((serie & 0x20) === 0) {
    clau = _BITS[6] + _BITS[10] + _BITS[21];
    cript = cript ^ (clau | 0);
  }

  // Bloque 4
  clau = 0;
  if (serie & _BITS[0]) clau += _BITS[0] + _BITS[8]  + _BITS[13] + _BITS[18] + _BITS[23];
  if (serie & _BITS[1]) clau += _BITS[3] + _BITS[16] + _BITS[20];
  if (serie & _BITS[2]) clau += _BITS[6] + _BITS[17];
  if (serie & _BITS[3]) clau += _BITS[5] + _BITS[10] + _BITS[21];
  if (serie & _BITS[4]) clau += _BITS[7] + _BITS[19];
  cript = cript ^ (clau | 0);

  // Bloque 5
  clau = 0;
  clau = _RB(dia, 0, 10, clau);
  clau = _RB(dia, 2, 17, clau);
  clau = _RB(dia, 3,  3, clau);
  clau = _RB(dia, 4, 23, clau);
  cript = cript ^ (clau | 0);

  return cript >>> 0;
}

/**
 * Genera un único código de 8 dígitos.
 *
 * @param {number} hospital    ID del hospital
 * @param {number} habitacion  Número de habitación
 * @param {number} tipoTicket  Tipo (0–7)
 * @param {number} cantidad    Valor del selector (1–8)
 * @param {Date}   fecha       Fecha del ticket
 * @returns {string}           Código de 8 dígitos
 */
function generarCodigo(hospital, habitacion, tipoTicket, cantidad, fecha) {
  const serie = Math.round(tipoTicket * 8.0 + (cantidad - 1));
  const dia   = fecha.getDate();
  const mes   = fecha.getMonth() + 1;
  const ano   = fecha.getFullYear() - 2000;
  return String(_encod(hospital, habitacion, serie, dia, mes, ano)).padStart(8, '0');
}

/**
 * Genera todos los códigos para las combinaciones seleccionadas.
 *
 * @param {number}   hospital      ID del hospital
 * @param {number[]} habitaciones  Lista de habitaciones
 * @param {number}   tipoTicket    Tipo de ticket (0–7)
 * @param {number[]} cantidades    Lista de valores del selector (1–8)
 * @param {Date}     fecha         Fecha del ticket
 * @returns {{ habitacion, idTicket, cantidad, codigo }[]}
 *   idTicket → valor interno 0–7 (cantidad - 1)
 *   cantidad → valor del selector 1–8
 */
function generarCodigos(hospital, habitaciones, tipoTicket, cantidades, fecha) {
  const resultados = [];
  for (const habitacion of habitaciones) {
    for (const cantidad of cantidades) {
      resultados.push({
        habitacion,
        idTicket: cantidad - 1,
        cantidad,
        codigo: generarCodigo(hospital, habitacion, tipoTicket, cantidad, fecha),
      });
    }
  }
  return resultados;
}
