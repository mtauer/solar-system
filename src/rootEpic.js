import { combineEpics } from 'redux-observable';
import { createUpdateTimestampEpic } from './features/solarSystem/redux';

export default combineEpics(
  createUpdateTimestampEpic(),
);
