import { dateToJulianDate } from './julianDate';

/*

Usage examples:

const mars = solarSystem.getMars();
mars.compute(Date.now());
const coordinates = mars.getHeliocentricCartesianCoordinates();

const solarSystem = new SolarSystem();
solarSystem.compute(Date.now());
const x = solarSystem.getMars().getCartesianCoordinates().x;

const solarSystem = new SolarSystem(Date.now());
const jd = solarSystem.getJulianDate();

*/

export default class SolarSystem {
  compute(date = Date.now(), options = { calendar: 'GREGORIAN_CALENDAR' }) {
    this.date = date;
    this.options = options;
  }

  getJulianDate() {
    return dateToJulianDate(this.date, this.options);
  }
}
