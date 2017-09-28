
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
  compute() {

  }

  getJulianDate() {
    return 0.5;
  }
}
