/* eslint-disable no-mixed-operators */

/*
 * Calculates the Julian Day (JD) or Julian Day Number (JDB) for a given
 * date (from Gregorian or Julian Calendar).
 *
 * References:
 * http://www.tondering.dk/claus/cal/julperiod.php#formula
 * https://en.wikipedia.org/wiki/Julian_day
 */
export function dateToJulianDate(timestamp = Date.now(), options = { calendar: 'GREGORIAN_CALENDAR' }) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const julianDayNumber = options.calendar === 'JULIAN_CALENDAR' ?
    julianDayNumberFromJulianCalendar() :
    julianDayNumberFromGregorianCalendar();
  const julianDate = julianDayNumber + (hour - 12) / 24 + minute / 14400 + second / 86400;
  return julianDate;

  function julianDayNumberFromGregorianCalendar() {
    return day
      + Math.floor((153 * m + 2) / 5)
      + 365 * y
      + Math.floor(y / 4)
      - Math.floor(y / 100)
      + Math.floor(y / 400)
      - 32045;
  }

  function julianDayNumberFromJulianCalendar() {
    return day
      + Math.floor((153 * m + 2) / 5)
      + 365 * y
      + Math.floor(y / 4)
      - 32083;
  }
}
