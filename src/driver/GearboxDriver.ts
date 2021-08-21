import { RpmProvider } from '../engine/RpmProvider';
import { GearCalculators } from './calculator/GearCalculators';
import { Shifter } from './shifter/Shifter';
import { DriveState } from './DriveState';
import { Gear } from './Gear';
import { GearCalculator } from './calculator/GearCalculator';

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private shifter: Shifter;
  private gearCalculators: GearCalculators;
  private state: DriveState = DriveState.Park;

  constructor(
    rpmProvider: RpmProvider,
    shifter: Shifter,
    gearCalculators: GearCalculators
  ) {
    this.rpmProvider = rpmProvider;
    this.shifter = shifter;
    this.gearCalculators = gearCalculators;
  }

  enableDrive(): void {
    this.state = DriveState.Drive;
  }

  enablePark(): void {
    this.state = DriveState.Park;
  }

  enableNeutral(): void {
    this.state = DriveState.Neutral;
  }

  recalculate(): void {
    if (this.state == DriveState.Drive) {
      const newGear: Gear = this.suggestedGear();
      this.shifter.changeGearTo(newGear);
    }
  }

  suggestedGear(): Gear {
    const gearCalculator: GearCalculator = this.gearCalculators.suggest();
    return gearCalculator.calculate(
      this.rpmProvider.current(),
      this.shifter.currentGear()
    );
  }
}
