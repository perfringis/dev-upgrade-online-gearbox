import sinon, { SinonMock } from 'sinon';
import { Characteristics } from '../src/Characteristics';
import { ExternalSystems } from '../src/ExternalSystems';
import { Gear } from '../src/Gear';
import { Gearbox } from '../src/Gearbox';
import { GearboxACL } from '../src/GearboxACL';
import { GearboxDriver } from '../src/GearboxDriver';
import { RpmProvider } from '../src/RpmProvider';

describe('Test GearboxDriver class', () => {
  const characteristics = new Characteristics();
  const rpmProvider = new RpmProvider(new ExternalSystems());
  const gearboxACL = new GearboxACL(new Gearbox());

  const gearTwo: Gear = new Gear(2);
  const gearEight: Gear = new Gear(8);
  const gearOne: Gear = new Gear(1);

  const driver: GearboxDriver = new GearboxDriver(
    rpmProvider,
    gearboxACL,
    characteristics
  );

  test('should shift up when above max RPM', () => {
    // given
    driver.enableDrive();
    // and
    sinon.stub(gearboxACL, 'maxGear').returns(gearEight);
  });
});
