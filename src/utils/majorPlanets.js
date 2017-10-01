/*
 * References:
 * https://ssd.jpl.nasa.gov/txt/aprx_pos_planets.pdf
 * http://cosinekitty.com/astronomy.js
 */

/* eslint-disable no-mixed-operators */

import { dateToJulianDate } from './julianDate';

export function getMajorPlanet(planetName) {
  return new MajorPlanet(
    KEPLERIAN_ELEMENTS_1800AD_2050AD[planetName],
    KEPLERIAN_ELEMENTS_3000BC_3000AD[planetName],
    ADDITINAL_TERMS_3000BC_3000AD[planetName],
  );
}

class MajorPlanet {
  constructor(keplerianElements1800ad2050ad, keplerianElements3000bc3000ad,
    additionalTerms3000bc3000ad) {
    this.keplerianElements1800ad2050ad = keplerianElements1800ad2050ad;
    this.keplerianElements3000bc3000ad = keplerianElements3000bc3000ad;
    this.additionalTerms3000bc3000ad = additionalTerms3000bc3000ad;
    this.timestamp = Date.now();
  }

  compute(timestamp) {
    this.timestamp = timestamp;
  }

  getEclipticCartesianCoordinates() {
    const keplerianElements = this.keplerianElements1800ad2050ad;
    if (!keplerianElements) { return { x: 0.0, y: 0.0, z: 0.0 }; }

    const j2000 = 2451545.0; // Janurary 1, 2000, 12:00 UT1
    const julianDate = dateToJulianDate(this.timestamp);
    const T = (julianDate - j2000) / 36525;

    const [a0, ac, e0, ec, i0, ic, L0, Lc, W0, Wc, N0, Nc] = keplerianElements;
    const a = a0 + ac * T;
    const e = e0 + ec * T;
    const i = i0 + ic * T;
    const L = L0 + Lc * T;
    const W = W0 + Wc * T;
    const N = N0 + Nc * T;
    const additionalTerms = this.additionalTerms3000bc3000ad;
    const b = additionalTerms ? additionalTerms.b : 0.0;
    const c = additionalTerms ? additionalTerms.c : 0.0;
    const s = additionalTerms ? additionalTerms.s : 0.0;
    const f = additionalTerms ? additionalTerms.f : 0.0;

    const w = W - N;
    const M = L - W + b * T * T + c * Math.cos(f * T) + s * Math.sin(f * T);
    const E = getEccentricAnomaly(modulusM(M), e);
    // Calculate the body's position in its own orbital plane
    const xv = a * (cosDeg(E) - e);
    const yv = a * Math.sqrt(1 - e * e) * sinDeg(E);

    // Now we are ready to calculate (unperturbed) ecliptic cartesian heliocentric coordinates.
    const cosW = cosDeg(w);
    const sinW = sinDeg(w);
    const cosN = cosDeg(N);
    const sinN = sinDeg(N);
    const cosI = cosDeg(i);
    const sinI = sinDeg(i);
    const xh = (cosW * cosN - sinW * sinN * cosI) * xv + (-sinW * cosN - cosW * sinN * cosI) * yv;
    const yh = (cosW * sinN + sinW * cosN * cosI) * xv + (-sinW * sinN + cosW * cosN * cosI) * yv;
    const zh = (sinW * sinI) * xv + (cosW * sinI) * yv;

    return { x: xh, y: yh, z: zh };

    function modulusM(x) {
      const xm = x % 360;
      if (xm < -180) {
        return xm + 360;
      } else if (xm > 180) {
        return xm - 360;
      }
      return xm;
    }
  }
}

const RAD_TO_DEG = 180.0 / Math.PI;
const DEG_TO_RAD = Math.PI / 180.0;

function getEccentricAnomaly(M, e) {
  let E = M + (RAD_TO_DEG * e * Math.sin(DEG_TO_RAD * M));
  let deltaM;
  let deltaE;
  /* eslint-disable no-constant-condition */
  while (true) {
    deltaM = M - (E - (RAD_TO_DEG * e * sinDeg(E)));
    deltaE = deltaM / (1 - e * cosDeg(E));
    if (Math.abs(deltaE) < 1.0e-8) { break; }
    E += deltaE;
  }
  /* eslint-enable no-constant-condition */
  return E;
}

function sinDeg(x) {
  return Math.sin(DEG_TO_RAD * x);
}

function cosDeg(x) {
  return Math.cos(DEG_TO_RAD * x);
}

/* eslint-disable key-spacing */
/* eslint-disable array-bracket-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
const KEPLERIAN_ELEMENTS_1800AD_2050AD = {
  //         a0          ac           e0           ec           i0           ic           L0            Lc               W0            Wc           N0            Nc
  Mercury: [ 0.38709927,  0.00000037,  0.20563593,  0.00001906,  7.00497902, -0.00594749, 252.25032350, 149472.30268499,  77.45779628,  0.16047689,  48.33076593, -0.12534081],
  Venus:   [ 0.72333566,  0.00000390,  0.00677672, -0.00004107,  3.39467605, -0.00078890, 181.97909950,  58517.81538729, 131.60246718,  0.00268329,  76.67984255, -0.27769418],
  Mars:    [ 1.52371034,  0.00001847,  0.09339410,  0.00007882,  1.84969142, -0.00813131,  -4.55343205,  19140.30268499, -23.94362959,  0.44441088,  49.55953891, -0.29257343],
  Jupiter: [ 5.20288700, -0.00011607,  0.04838624, -0.00013253,  1.30439695, -0.00183714,  34.39644051,   3034.74612775,  14.72847983,  0.21252668, 100.47390909,  0.20469106],
};

const KEPLERIAN_ELEMENTS_3000BC_3000AD = {
};

const ADDITINAL_TERMS_3000BC_3000AD = {
};
/* eslint-enable max-len */
/* eslint-enable no-multi-spaces */
/* eslint-enable array-bracket-spacing */
/* eslint-disable key-spacing */
