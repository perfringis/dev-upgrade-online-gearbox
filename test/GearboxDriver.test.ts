import { GearboxDriver } from '../src/GearboxDriver';
import sinon from "sinon";
import { Gearbox } from '../src/Gearbox';

describe('Test gearbox driver', () => {
  test('Test gearbox driver', () => {

    let gearbox: Gearbox = new Gearbox();
    sinon.stub(gearbox, 'getState').returns(1);
    sinon.stub(gearbox, 'getCurrentGear').returns(2);

    let mock = sinon.mock(new GearboxDriver());
    // mock.expects('setGearBox').returns(gearbox);
    // driver.setGearBox(gearbox);
    // driver.handleGas(13);
    // driver.setIfCaravan(false);

    mock.verify();
  });
});
