import { GearCalculator } from '../../driver/calculator/GearCalculator';
import { Gear } from '../../driver/Gear';
import { RPM } from '../../engine/RPM';

export class MaintainGear implements GearCalculator {
  calculate(rpm: RPM, gear: Gear): Gear {
    return gear;
  }
}
