import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SolarSystemPage extends PureComponent {
  render() {
    const { timestamp, dateString } = this.props;
    return (
      <div>
        <h1>SolarSystemPage</h1>
        <p>Unix timestamp: {timestamp}</p>
        <p>{dateString}</p>
      </div>
    );
  }
}

const propTypes = {
  timestamp: PropTypes.number.isRequired,
  dateString: PropTypes.string.isRequired,
};
SolarSystemPage.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { timestamp } = state.solarSystem;
  const dateString = new Date(timestamp).toString();
  return {
    timestamp,
    dateString,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SolarSystemPage);
