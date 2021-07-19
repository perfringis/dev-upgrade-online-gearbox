import { Gear } from './Gear';
import { GearRange } from './GearRange';
import { RPM } from './RPM';
import { RpmRange } from './RpmRange';

export class GearCalculator {
  private optimalRange: RpmRange;
  private gearRange: GearRange;

  constructor(optimalRange: RpmRange, gearRange: GearRange) {
    this.optimalRange = optimalRange;
    this.gearRange = gearRange;
  }

  calculateGear(currentRpm: RPM, currentGear: Gear): Gear {
    if (currentRpm.isAbove(this.optimalRange)) {
      return this.gearRange.next(currentGear);
    }

    if (currentRpm.isBelow(this.optimalRange)) {
      return this.gearRange.previous(currentGear);
    }

    return currentGear;
  }
}
