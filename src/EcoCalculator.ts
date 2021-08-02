import { GearCalculator } from './GearCalculator';
import { GearRange } from './GearRange';
import { RpmRange } from './RpmRange';

export class EcoCalculator extends GearCalculator {
  constructor(optimalRange: RpmRange, gearRange: GearRange) {
    super(optimalRange, gearRange);
  }
}
