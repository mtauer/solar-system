import Rx from 'rxjs/Rx';

// Initial State

const initialState = {
  timestamp: Date.now(),
};

// Action Types

const PREFIX = 'solarSystem/';
export const SET_TIMESTAMP = `${PREFIX}SET_TIMESTAMP`;

// Action Creators

export function setTimestamp(timestamp) {
  return { type: SET_TIMESTAMP, timestamp };
}

// Reducer

export default function tasksOverviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TIMESTAMP:
      return {
        ...state,
        timestamp: action.timestamp,
      };
    default:
      return state;
  }
}

// Epics

export function createUpdateTimestampEpic(timeScale = 1, scheduler) {
  return () =>
    Rx.Observable.timer(0, 1000 * timeScale, scheduler)
      .map(() => Date.now())
      .map(timestamp => setTimestamp(timestamp));
}
