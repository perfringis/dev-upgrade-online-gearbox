import { RPM } from '../src/engine/RPM';
import { RpmRange } from '../src/engine/RpmRange';

describe('Test RpmRange class', () => {
  test('should create rpm range', () => {
    expect(() => {
      new RpmRange(RPM.k(2), RPM.k(3));
    }).not.toThrowError(new Error('Wrong RPMs'));
  });

  test('should not create rpm range', () => {
    expect(() => {
      new RpmRange(RPM.k(3), RPM.k(2));
    }).toThrowError(new Error('Wrong RPMs'));
  });

  test('should not create rpm range when one of RPMs is negative', () => {
    expect(() => {
      new RpmRange(RPM.k(-1), RPM.k(2));
    }).toThrowError(new Error('Negative RPM'));

    expect(() => {
      new RpmRange(RPM.k(2), RPM.k(-1));
    }).toThrowError(new Error('Negative RPM'));

    expect(() => {
      new RpmRange(RPM.k(-2), RPM.k(-1));
    }).toThrowError(new Error('Negative RPM'));
  });
});
