import { GearCalculator } from '../../driver/calculator/GearCalculator';
import { Gear } from '../../driver/Gear';
import { GearRange } from '../../driver/GearRange';
import { RPM } from '../../engine/RPM';
import { RpmRange } from '../../engine/RpmRange';

export class OptimalRange implements GearCalculator {
  private range: GearRange;
  private optimalRange: RpmRange;

  constructor(range: GearRange, optimalRange: RpmRange) {
    this.range = range;
    this.optimalRange = optimalRange;
  }

  calculate(currentRpm: RPM, currentGear: Gear): Gear {
    const gear: Gear = this.calculateGear(currentRpm, currentGear);
    return this.range.trim(gear);
  }

  private calculateGear(currentRpm: RPM, currentGear: Gear): Gear {
    if (currentRpm.isBelow(this.optimalRange)) {
      return currentGear.previous();
    } else if (currentRpm.isAbove(this.optimalRange)) {
      return currentGear.next();
    } else {
      return currentGear;
    }
  }
}
