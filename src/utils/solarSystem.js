import { dateToJulianDate } from './julianDate';

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

  getMarsEclipticCartesianCoordinates() {
    const julianDate2000 = 2451544.5;
    const day = this.getJulianDate() - julianDate2000 + 1;

    const N0 = 49.5574;
    const Nc = 2.11081e-5;
    const i0 = 1.8497;
    const ic = -1.78e-8;
    const w0 = 286.5016;
    const wc = 2.92961e-5;
    const a0 = 1.523688;
    const ac = 0.0;
    const e0 = 0.093405;
    const ec = 2.516e-9;
    const M0 = 18.6021;
    const Mc = 0.5240207766;

    const N = N0 + (day * Nc);
    const i = i0 + (day * ic);
    const w = w0 + (day * wc);
    const a = a0 + (day * ac);
    const e = e0 + (day * ec);
    const M = M0 + (day * Mc);

    const E = getEccentricAnomaly(e, M);

    // Calculate the body's position in its own orbital plane, and its
    // distance from the thing it is orbiting.
    const xv = a * (cosDeg(E) - e);
    const yv = a * (Math.sqrt(1.0 - e * e) * sinDeg(E));

    // True anomaly in degrees: the angle from perihelion of the body as seen by the Sun.
    const v = atan2Deg(yv, xv);
    // Distance from the Sun to the planet in AU
    const r = Math.sqrt(xv * xv + yv * yv);

    const cosN = cosDeg(N);
    const sinN = sinDeg(N);
    const cosi = cosDeg(i);
    const sini = sinDeg(i);
    const cosVW = cosDeg(v + w);
    const sinVW = sinDeg(v + w);

    // Now we are ready to calculate (unperturbed) ecliptic cartesian heliocentric coordinates.
    const xh = r * (cosN * cosVW - sinN * sinVW * cosi);
    const yh = r * (sinN * cosVW + cosN * sinVW * cosi);
    const zh = r * sinVW * sini;

    return { x: xh, y: yh, z: zh };
  }
}

const DEG_FROM_RAD = 180.0 / Math.PI;
const RAD_FROM_DEG = Math.PI / 180.0;

function getEccentricAnomaly(e, M) {
  let E = M + (e * sinDeg(M) * (1.0 + (e * cosDeg(M))));
  for (;;) {
    const F = E - (E - (DEG_FROM_RAD * e * sinDeg(E)) - M) / (1 - e * cosDeg(E));
    const error = Math.abs(F - E);
    E = F;
    if (error < 1.0e-8) {
      break; // the angle is good enough now for our purposes
    }
  }
  return E;
}

function sinDeg(degrees) {
  return Math.sin(RAD_FROM_DEG * degrees);
}

function cosDeg(degrees) {
  return Math.cos(RAD_FROM_DEG * degrees);
}

function atan2Deg(y, x) {
  return DEG_FROM_RAD * Math.atan2(y, x);
}
