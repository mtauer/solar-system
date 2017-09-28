import React, { Component } from 'react';
import { Provider } from 'react-redux';

import SolarSystemPage from './features/solarSystem/SolarSystemPage';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SolarSystemPage />
      </Provider>
    );
  }
}

export default App;
