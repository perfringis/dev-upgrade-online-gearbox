import { Gear } from '../src/Gear';
import { GearCalculator } from '../src/GearCalculator';
import { GearRange } from '../src/GearRange';
import { RPM } from '../src/RPM';
import { RpmRange } from '../src/RpmRange';

describe('Test GearCalculator class', () => {
  const calculator: GearCalculator = new GearCalculator(
    new RpmRange(RPM.k(2), RPM.k(3)),
    new GearRange(new Gear(1), new Gear(8))
  );

  test('should shift up when above max RPM', () => {
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(3300), new Gear(6));
    expect(new Gear(7)).toEqual(nextGear);
  });

  test('should shift done when below min RPM', () => {
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(1300), new Gear(6));
    expect(new Gear(5)).toEqual(nextGear);
  });

  test('should do nothing when within optional RPM', () => {
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(2300), new Gear(6));
    expect(new Gear(6)).toEqual(nextGear);
  });

  test('should do nothing when max gear reached', () => {
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(3300), new Gear(8));
    expect(new Gear(8)).toEqual(nextGear);
  });

  test('should do nothing when min gear reached', () => {
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(1300), new Gear(1));
    expect(new Gear(1)).toEqual(nextGear);
  });
});
