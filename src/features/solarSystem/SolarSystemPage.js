import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dateToJulianDate } from '../../utils/julianDate';
import SolarSystem from '../../utils/solarSystem';

const solarSystem = new SolarSystem();

class SolarSystemPage extends PureComponent {
  render() {
    const { timestamp, dateString, julianDate, coordinates } = this.props;
    return (
      <div>
        <h1>Solar System</h1>
        <p>Unix timestamp: {timestamp}</p>
        <p>{dateString} (Gregorian Calendar)</p>
        <p>Julian date: {julianDate}</p>
        <p>
          Mars - heliocentric coordinates (in AU)
          : {coordinates.x}, {coordinates.y}, {coordinates.z}
        </p>
      </div>
    );
  }
}

const propTypes = {
  timestamp: PropTypes.number.isRequired,
  dateString: PropTypes.string.isRequired,
  julianDate: PropTypes.number.isRequired,
  coordinates: PropTypes.object.isRequired,
};
SolarSystemPage.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { timestamp } = state.solarSystem;
  const dateString = new Date(timestamp).toString();
  const julianDate = dateToJulianDate(timestamp);
  solarSystem.compute(timestamp);
  const coordinates = solarSystem.getMarsEclipticCartesianCoordinates();
  return {
    timestamp,
    dateString,
    julianDate,
    coordinates,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SolarSystemPage);
