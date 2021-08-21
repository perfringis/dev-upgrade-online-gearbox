import { GearCalculator } from '../../../driver/calculator/GearCalculator';
import { Gear } from '../../../driver/Gear';
import { GearRange } from '../../../driver/GearRange';
import { RPM } from '../../../engine/RPM';
import { RpmRange } from '../../../engine/RpmRange';

export class DoubleKickDown implements GearCalculator {
  private range: GearRange;
  private optimalRange: RpmRange;

  constructor(range: GearRange, optimalRange: RpmRange) {
    this.range = range;
    this.optimalRange = optimalRange;
  }

  calculate(rpm: RPM, current: Gear): Gear {
    if (rpm.isAbove(this.optimalRange.leftHalf())) {
      return current.previous();
    } else if (!rpm.isAbove(this.optimalRange)) {
      return current.previous();
    } else {
      return current;
    }
  }
}
