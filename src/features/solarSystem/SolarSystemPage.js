import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dateToJulianDate } from '../../utils/julianDate';

class SolarSystemPage extends PureComponent {
  render() {
    const { timestamp, dateString, julianDate } = this.props;
    return (
      <div>
        <h1>SolarSystemPage</h1>
        <p>Unix timestamp: {timestamp}</p>
        <p>{dateString} (Gregorian Calendar)</p>
        <p>Julian date: {julianDate}</p>
      </div>
    );
  }
}

const propTypes = {
  timestamp: PropTypes.number.isRequired,
  dateString: PropTypes.string.isRequired,
  julianDate: PropTypes.number.isRequired,
};
SolarSystemPage.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { timestamp } = state.solarSystem;
  const dateString = new Date(timestamp).toString();
  const julianDate = dateToJulianDate(timestamp);
  return {
    timestamp,
    dateString,
    julianDate,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SolarSystemPage);
