import { GearCalculator } from '../../../driver/calculator/GearCalculator';
import { GearCalculators } from '../../../driver/calculator/GearCalculators';
import { Gear } from '../../../driver/Gear';
import { GearRange } from '../../../driver/GearRange';
import { Shifter } from '../../../driver/shifter/Shifter';
import { MaintainGear } from '../../boringcommoncar/MaintainGear';
import { OptimalRange } from '../../boringcommoncar/OptimalRange';
import { BmwExternalSystems } from '../BmwExternalSystems';
import { Characteristics } from '../Characteristics';
import { AggressiveLevel } from './AggressiveLevel';
import { DoubleKickDown } from './DoubleKickDown';
import { DriveMode } from './DriveMode';
import { KickDown } from './KickDown';

export class BmwGearCalculators implements GearCalculators {
  private mode: DriveMode = DriveMode.Comfort;
  private aggressiveLevel: AggressiveLevel = AggressiveLevel.FIRST;

  private isMDynamics: boolean = false;
  private isKickedDown: boolean = false;

  private characteristics: Characteristics;
  private shifter: Shifter;
  private bmwExternalSystems: BmwExternalSystems;

  constructor(
    characteristics: Characteristics,
    shifter: Shifter,
    bmwExternalSystems: BmwExternalSystems
  ) {
    this.characteristics = characteristics;
    this.shifter = shifter;
    this.bmwExternalSystems = bmwExternalSystems;
  }

  suggest(): GearCalculator {
    if (this.isDrifting()) {
      return new MaintainGear();
    }

    if (this.isEco()) {
      return new OptimalRange(
        this.gearRange(),
        this.characteristics.optimalEcoRpmRange()
      );
    }

    if (this.isComfort()) {
      if (this.isKickedDown) {
        return new KickDown(
          this.gearRange(),
          this.aggressiveLevel.modify(
            this.characteristics.optimalComfortRpmRange()
          )
        );
      } else {
        return new OptimalRange(
          this.gearRange(),
          this.aggressiveLevel.modify(
            this.characteristics.optimalComfortRpmRange()
          )
        );
      }
    }

    if (this.isSport()) {
      if (this.isKickedDown) {
        return new DoubleKickDown(
          this.gearRange(),
          this.aggressiveLevel.modify(
            this.characteristics.optimalSportRpmRange()
          )
        );
      } else {
        return new OptimalRange(
          this.gearRange(),
          this.aggressiveLevel.modify(
            this.characteristics.optimalSportRpmRange()
          )
        );
      }
    }

    return new OptimalRange(
      this.gearRange(),
      this.aggressiveLevel.modify(this.characteristics.optimalComfortRpmRange())
    );
  }

  ecoMode(): void {
    this.mode = DriveMode.Eco;
  }

  comfortMode(): void {
    this.mode = DriveMode.Comfort;
  }

  sportMode(): void {
    this.mode = DriveMode.Sport;
  }

  enableMDynamics(): void {
    this.isMDynamics = true;
  }

  disableMDynamics(): void {
    this.isMDynamics = false;
  }

  aggresiveLevel(level: AggressiveLevel): void {
    this.aggressiveLevel = level;
  }

  kickDownEnabled(): void {
    this.isKickedDown = true;
  }

  kickDownDisabled(): void {
    this.isKickedDown = false;
  }

  isDrifting(): boolean {
    return (
      this.isMDynamics &&
      this.bmwExternalSystems.getAngularSpeed() >
        this.characteristics.angularSpeedForDrifting()
    );
  }

  private gearRange(): GearRange {
    return new GearRange(new Gear(1), this.shifter.getMaxDrive());
  }

  isEco(): boolean {
    return this.mode === DriveMode.Eco;
  }

  isComfort(): boolean {
    return this.mode === DriveMode.Comfort;
  }

  isSport(): boolean {
    return this.mode === DriveMode.Sport;
  }
}
