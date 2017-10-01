import { dateToJulianDate } from './julianDate';
import { getMajorPlanet } from './majorPlanets';

/* eslint-disable no-mixed-operators */

/*

Usage examples:

const mars = solarSystem.getObject('Mars');
const marsCoordinates = timestamps.map(timestamp => {
  mars.compute(timestamp);
  return mars.getCartesianCoordinates();
});

*/

export default class SolarSystem {
  compute(date = Date.now(), options = { calendar: 'GREGORIAN_CALENDAR' }) {
    this.date = date;
    this.options = options;
  }

  getJulianDate() {
    return dateToJulianDate(this.date, this.options);
  }

  getMajorPlanet(planetName) {
    return getMajorPlanet(planetName);
  }
}
