import { DriveState } from './DriveState';
import { Gear } from './Gear';
import { GearboxACL } from './GearboxACL';
import { GearCalculator } from './GearCalculator';
import { GearCalculators } from './GearCalculators';
import { RpmProvider } from './RpmProvider';

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private gearboxACL: GearboxACL;
  private gearCalculators: GearCalculators;
  private state: DriveState = DriveState.Park;

  constructor(
    rpmProvider: RpmProvider,
    gearboxACL: GearboxACL,
    gearCalculators: GearCalculators
  ) {
    this.rpmProvider = rpmProvider;
    this.gearboxACL = gearboxACL;
    this.gearCalculators = gearCalculators;
  }

  recalculate(): void {
    if (this.state === DriveState.Drive) {
      const gearCalculator: GearCalculator = this.gearCalculators.choose();
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

  enableNeutral(): void {
    this.state = DriveState.Neutral;
  }
}
