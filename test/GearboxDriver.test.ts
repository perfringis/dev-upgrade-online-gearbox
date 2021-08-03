import sinon, { SinonMock, verify } from 'sinon';
import { Characteristics } from '../src/Characteristics';
import { ExternalSystems } from '../src/ExternalSystems';
import { Gear } from '../src/Gear';
import { Gearbox } from '../src/Gearbox';
import { GearboxACL } from '../src/GearboxACL';
import { GearboxDriver } from '../src/GearboxDriver';
import { RPM } from '../src/RPM';
import { RpmProvider } from '../src/RpmProvider';
import { RpmRange } from '../src/RpmRange';

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

  test('should recalculate gear in drive mode', () => {
    const gearboxACLMock = sinon.mock(gearboxACL);
    const characteristicsMock = sinon.mock(characteristics);
    const rpmProviderMock = sinon.mock(rpmProvider);

    // given
    driver.enableDrive();

    // and
    gearboxACLMock.expects('maxGear').returns(gearEight);
    // and
    gearboxACLMock.expects('firstGear').returns(gearOne);
    //and
    gearboxACLMock.expects('currentGear').returns(gearOne);
    //and
    characteristicsMock
      .expects('optimalComfortRpmRange')
      .returns(new RpmRange(RPM.k(2000), RPM.k(3000)));
    // and
    rpmProviderMock.expects('current').returns(RPM.k(3200));

    // when
    driver.recalculate();

    //then
    gearboxACLMock.expects('changeGearTo').withArgs(gearTwo);
    gearboxACLMock.verify();
  });
});
