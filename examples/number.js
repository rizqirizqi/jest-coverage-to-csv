/**
 * Return random integer in between min and max (exclusive)
 *
 * @example
 * getRandomInt(0, 5)
 * // => 0, 1, 2, 3, 4 or 5
 *
 * @param  {Number} min minimum possible value
 * @param  {Number} max maximum possible value
 *
 * @return {Number}
 */
export function getRandomInt(min, max) {
  if (max < min) {
    throw new Error('Max must be greater or equal than min');
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Delimit number
 *
 * @example
 * delimiter(1000000)
 * // => '1,000,000'
 *
 * @param  {Number|String} val Number to delimit
 * @return {String} Delimited number
 */
export function delimiter(val, separator = ',') {
  const str = `${val}`;
  const delimited = str.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return `${val < 0 ? '-' : ''}${delimited}`;
}
