import { mock, when, verify, instance } from 'ts-mockito';

import { Characteristics } from '../src/Characteristics';
import { Gear } from '../src/Gear';
import { GearboxACL } from '../src/GearboxACL';
import { GearboxDriver } from '../src/GearboxDriver';
import { RPM } from '../src/RPM';
import { RpmProvider } from '../src/RpmProvider';
import { RpmRange } from '../src/RpmRange';

describe('Test GearboxDriver class', () => {
  const mockRpmProvider: RpmProvider = mock(RpmProvider);
  const mockGearboxACL: GearboxACL = mock(GearboxACL);
  const mockCharacteristics: Characteristics = mock(Characteristics);

  const rpmProvider = instance(mockRpmProvider);
  const gearboxACL = instance(mockGearboxACL);
  const characteristics = instance(mockCharacteristics);

  const driver: GearboxDriver = new GearboxDriver(
    rpmProvider,
    gearboxACL,
    characteristics
  );

  const gearTwo: Gear = new Gear(2);
  const gearEight: Gear = new Gear(8);
  const gearOne: Gear = new Gear(1);

  test('should recalculate gear in drive mode', () => {
    // given
    driver.enableDrive();
    // and
    when(mockGearboxACL.maxGear()).thenReturn(gearEight);
    // and
    when(mockGearboxACL.firstGear()).thenReturn(gearOne);
    // and
    when(mockGearboxACL.currentGear()).thenReturn(gearOne);
    // and
    when(mockCharacteristics.optimalComfortRpmRange()).thenReturn(
      new RpmRange(RPM.k(2000), RPM.k(3000))
    );
    // and
    when(mockRpmProvider.current()).thenReturn(RPM.k(3200));

    // when
    driver.recalculate();

    // then
    verify(mockGearboxACL.changeGearTo(gearTwo)).called();
  });

  test('should not recalculate gear in park mode', () => {
    // given
    driver.enableDrive();

    // when
    driver.recalculate();

    // then
    verify(mockGearboxACL.changeGearTo(gearTwo)).never();
  });

  test('should not recalculate gear in neutral mode', () => {
    // given
    driver.enableDrive();

    // when
    driver.recalculate();

    // then
    verify(mockGearboxACL.changeGearTo(gearTwo)).never();
  });
});
