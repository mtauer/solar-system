import { combineReducers } from 'redux';
import solarSystemReducer from './features/solarSystem/redux';

export default combineReducers({
  solarSystem: solarSystemReducer,
});
