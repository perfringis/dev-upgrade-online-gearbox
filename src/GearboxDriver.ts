import { DriveState } from './DriveState';
import { Gear } from './Gear';
import { GearboxACL } from './GearboxACL';
import { GearCalculator } from './GearCalculator';
import { RpmProvider } from './RpmProvider';

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private gearbox: GearboxACL;
  private gearCalculator: GearCalculator;
  private state: DriveState = DriveState.Park;

  constructor(
    rpmProvider: RpmProvider,
    gearbox: GearboxACL,
    gearCalculator: GearCalculator
  ) {
    this.rpmProvider = rpmProvider;
    this.gearbox = gearbox;
    this.gearCalculator = gearCalculator;
  }

  calculate(): void {
    if (this.state === DriveState.Drive) {
      const newGear: Gear = this.gearCalculator.calculateGear(
        this.rpmProvider.current(),
        this.gearbox.currentGear()
      );
      this.gearbox.changeGearTo(newGear);
    }
  }
}
