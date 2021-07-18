export class Gear {
  private gear: number;

  constructor(gear: number) {
    if (gear < 0) {
      throw new Error('Negative representation of gear');
    }

    this.gear = gear;
  }

  public equals(otherGear: Gear) {
    return this.gear === otherGear.gear;
  }

  public next(): Gear {
    return new Gear(this.gear + 1);
  }

  public previous(): Gear {
    return new Gear(this.gear - 1);
  }
}
