import { Characteristics } from './Characteristics';
import { ComfortCalculator } from './ComfortCalculator';
import { DriveMode } from './DriveMode';
import { DriveState } from './DriveState';
import { EcoCalculator } from './EcoCalculator';
import { Gear } from './Gear';
import { GearboxACL } from './GearboxACL';
import { GearCalculator } from './GearCalculator';
import { GearRange } from './GearRange';
import { RpmProvider } from './RpmProvider';
import { SportCalculator } from './SportCalculator';

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private gearboxACL: GearboxACL;
  private characteristics: Characteristics;
  private state: DriveState = DriveState.Park;
  private driveMode: DriveMode = DriveMode.Comfort;

  constructor(
    rpmProvider: RpmProvider,
    gearboxACL: GearboxACL,
    characteristics: Characteristics
  ) {
    this.rpmProvider = rpmProvider;
    this.gearboxACL = gearboxACL;
    this.characteristics = characteristics;
  }

  recalculate(): void {
    if (this.state === DriveState.Drive) {
      const gearCalculator: GearCalculator = this.chooseCalculator();
      const newGear: Gear = gearCalculator.calculateGear(
        this.rpmProvider.current(),
        this.gearboxACL.currentGear()
      );

      this.gearboxACL.changeGearTo(newGear);
    }
  }

  enableDrive(): void {
    this.state = DriveState.Drive;
  }

  enablePark(): void {
    this.state = DriveState.Park;
  }

  enableReverse(): void {
    this.state = DriveState.Reverse;
  }

  chooseCalculator(): GearCalculator {
    if (this.driveMode === DriveMode.Eco) {
      return new EcoCalculator(
        this.characteristics.optimalEcoRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    }

    if (this.driveMode === DriveMode.Comfort) {
      return new ComfortCalculator(
        this.characteristics.optimalComfortRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    }

    if (this.driveMode === DriveMode.Sport) {
      return new SportCalculator(
        this.characteristics.optimalSportRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    }

    return new ComfortCalculator(
      this.characteristics.optimalComfortRpmRange(),
      new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
    );
  }
}
