import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SolarSystemPage extends PureComponent {
  render() {
    const { timestamp } = this.props;
    return (
      <div>
        <h1>SolarSystemPage</h1>
        <p>Unix timestamp: {timestamp}</p>
      </div>
    );
  }
}

const propTypes = {
  timestamp: PropTypes.number.isRequired,
};
SolarSystemPage.propTypes = propTypes;

const mapStateToProps = state => ({
  timestamp: state.solarSystem.timestamp,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SolarSystemPage);
