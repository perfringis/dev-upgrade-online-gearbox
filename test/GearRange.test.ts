import { Gear } from '../src/driver/Gear';
import { GearRange } from '../src/driver/GearRange';

describe('Test GearRange class', () => {
  const gearRange: GearRange = new GearRange(new Gear(1), new Gear(6));

  test('should cut gear when gear is greater than max', () => {
    expect(gearRange.trim(new Gear(7))).toEqual(new Gear(6));
    expect(gearRange.next(new Gear(7))).toEqual(new Gear(6));
  });

  test('should cut gear when gear is lower than min', () => {
    expect(gearRange.trim(new Gear(0))).toEqual(new Gear(1));
    expect(gearRange.previous(new Gear(1))).toEqual(new Gear(1));
  });

  test('should raise exception when gear range is wrong', () => {
    expect(() => {
      new GearRange(new Gear(2), new Gear(1));
    }).toThrowError(new Error('Invalid gear range'));
  });
});
