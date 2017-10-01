import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { dateToJulianDate } from '../../utils/julianDate';
import SolarSystem from '../../utils/solarSystem';

const solarSystem = new SolarSystem();

class SolarSystemPage extends PureComponent {
  render() {
    const { marsPositionsArray } = this.props;
    return (
      <section className="page-wrapper">
        <h1>Solar System</h1>
        <h6>Mars: Date, Julian Date, Heliocentric Coordinates (in AU):</h6>
        {marsPositionsArray.map(item => (
          <p key={item.timestamp}>
            {new Date(item.timestamp).toDateString()}, {dateToJulianDate(item.timestamp)}
            | {formatPos(item.x)}, {formatPos(item.y)}, {formatPos(item.z)}
          </p>
        ))}
      </section>
    );

    function formatPos(number) {
      return _.padStart(number.toFixed(6), 9, '+');
    }
  }
}

const propTypes = {
  marsPositionsArray: PropTypes.array.isRequired,
};
SolarSystemPage.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { timestamp } = state.solarSystem;
  const mars = solarSystem.getMajorPlanet('Mars').compute(timestamp);
  const dayMilliseconds = 24 * 60 * 60 * 1000;
  const itemCount = 300;
  const timestampArray = _.range(
    timestamp - ((itemCount - 1) * dayMilliseconds),
    timestamp + (1 * dayMilliseconds),
    dayMilliseconds);
  const marsPositionsArray = timestampArray
    .map((ts) => {
      mars.compute(ts);
      return {
        ...mars.getEclipticCartesianCoordinates(),
        timestamp: ts,
      };
    });

  return {
    marsPositionsArray,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SolarSystemPage);
