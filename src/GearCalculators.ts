import { Characteristics } from './Characteristics';
import { DriveMode } from './DriveMode';
import { GearboxACL } from './GearboxACL';
import { GearCalculator } from './GearCalculator';
import { GearRange } from './GearRange';

export class GearCalculators {
  private driveMode: DriveMode = DriveMode.Comfort;
  private characteristics: Characteristics;
  private gearboxACL: GearboxACL;

  constructor(gearboxACL: GearboxACL, characteristics: Characteristics) {
    this.gearboxACL = gearboxACL;
    this.characteristics = characteristics;
  }

  choose(): GearCalculator {
    if (this.driveMode === DriveMode.Eco) {
      return new GearCalculator(
        this.characteristics.optimalEcoRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    }

    if (this.driveMode === DriveMode.Comfort) {
      return new GearCalculator(
        this.characteristics.optimalComfortRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    }

    if (this.driveMode === DriveMode.Sport) {
      return new GearCalculator(
        this.characteristics.optimalSportRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    }

    return new GearCalculator(
      this.characteristics.optimalComfortRpmRange(),
      new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
    );
  }

  enableEco(): void {
    this.driveMode = DriveMode.Eco;
  }

  enableComfort(): void {
    this.driveMode = DriveMode.Comfort;
  }

  enableSport(): void {
    this.driveMode = DriveMode.Sport;
  }
}
