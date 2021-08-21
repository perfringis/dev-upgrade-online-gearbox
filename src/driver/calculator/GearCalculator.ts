import { RPM } from '../../engine/RPM';
import { Gear } from '../Gear';

export interface GearCalculator {
  calculate(rpm: RPM, current: Gear): Gear;
}
