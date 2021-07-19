import { threadId } from 'worker_threads';
import { Gear } from './Gear';

export class GearRange {
  private minGear: Gear;
  private maxGear: Gear;

  constructor(minGear: Gear, maxGear: Gear) {
    if (minGear.greaterThan(maxGear)) {
      throw new Error('Invalid gear range');
    }

    this.minGear = minGear;
    this.maxGear = maxGear;
  }

  trim(gear: Gear): Gear {
    if (gear.greaterThan(this.maxGear)) {
      return this.maxGear;
    }

    if (gear.lowerOrEqualTo(this.minGear)) {
      return this.minGear;
    }

    return gear;
  }

  next(currentGear: Gear): Gear {
    const nextGear: Gear = currentGear.next();

    if (nextGear.greaterThan(this.maxGear)) {
      return this.maxGear;
    }
    
    return nextGear;
  }

  previous(currentGear: Gear): Gear {
    const nextGear: Gear = currentGear.previous();

    if (nextGear.lowerOrEqualTo(this.minGear)) {
      return this.minGear;
    }

    return nextGear;
  }
}
