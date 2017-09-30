import { dateToJulianDate } from './julianDate';

describe('dateToJulianDate', () => {
  describe('Convert Gregorian calendar dates', () => {
    it('should convert 1.4.2004, 12:00 UT1 into julian date 2453097.0', () => {
      expect(dateToJulianDate(Date.UTC(2004, 3, 1, 12, 0))).toBe(2453097);
    });

    it('should convert 17.10.2017, 00:00 UT1 into julian date 2458043.5', () => {
      expect(dateToJulianDate(Date.UTC(2017, 9, 17, 0, 0))).toBe(2458043.5);
    });

    it('should convert 1.1.2000, 12:00 UT1 into julian date 2451545.0', () => {
      expect(dateToJulianDate(Date.UTC(2000, 0, 1, 12, 0))).toBe(2451545.0);
    });

    it('should convert 18.9.763, 12:00 UT1 (based on back-dated Gregorian calendar) into julian date 2000000.0', () => {
      expect(dateToJulianDate(Date.UTC(763, 8, 18, 12, 0))).toBe(2000000.0);
    });
  });

  describe('Convert Julian calendar dates', () => {
    it('should convert 14.9.763, 12:00 UT1 (based on Julian calendar) into julian date 2000000.0', () => {
      expect(dateToJulianDate(Date.UTC(763, 8, 14, 12, 0), { calendar: 'JULIAN_CALENDAR' })).toBe(2000000.0);
    });
  });
});
