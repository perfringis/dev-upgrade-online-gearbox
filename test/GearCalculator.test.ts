import { GearCalculator } from '../src/GearCalculator';
import { RPM } from '../src/RPM';

describe('Test GearCalculator class', () => {
  const calculator: GearCalculator = new GearCalculator(RPM.k(2), RPM.k(3), 8);

  test('should shift up when above max RPM', () => {
    const nextGear: number = calculator.calculate(RPM.rpm(3300), 6);

    expect(7).toEqual(nextGear);
  });

  test('should shift done when below min RPM', () => {
    const nextGear: number = calculator.calculate(RPM.rpm(1300), 6);
    expect(5).toEqual(nextGear);
  });

  test('should do nothing when within optional RPM', () => {
    const nextGear: number = calculator.calculate(RPM.rpm(2300), 6);
    expect(6).toEqual(nextGear);
  });

  test('should do nothing when max gear reached', () => {
    const nextGear: number = calculator.calculate(RPM.rpm(3300), 8);
    expect(8).toEqual(nextGear);
  });

  test('should do nothing when min gear reached', () => {
    const nextGear: number = calculator.calculate(RPM.rpm(1300), 1);
    expect(1).toEqual(nextGear);
  });
});
