import assert from 'assert';
import Rx from 'rxjs/Rx';
import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export function setUpMarbleTests() {
  global.rxTestScheduler = new Rx.TestScheduler(deepEqualWithFormattedError);
  global.expectObservable = function expectObservable(...args) {
    return global.rxTestScheduler.expectObservable(...args);
  };
  global.cold = function cold(...args) {
    return global.rxTestScheduler.createColdObservable(...args);
  };
  global.hot = function hot(...args) {
    return global.rxTestScheduler.createHotObservable(...args);
  };
  global.flush = function flush(...args) {
    return global.rxTestScheduler.flush(...args);
  };

  function deepEqualWithFormattedError(actual, expected) {
    assert.deepEqual(actual, expected, `

Got:
${formatFrames(actual)}

Expected:
${formatFrames(expected)}
      `,
    );

    function formatFrames(frames) {
      return frames.map((f) => {
        const frameString = _.padStart(f.frame, 5);
        const notificationString = JSON.stringify(f.notification);
        return `Frame ${frameString} ${notificationString}\n`;
      }).join('');
    }
  }
}
