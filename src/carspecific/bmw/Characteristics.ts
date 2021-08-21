import { RPM } from '../../engine/RPM';
import { RpmRange } from '../../engine/RpmRange';

export class Characteristics {
  private characteristics: number[] = [
    2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500,
    2000, 3000, 6500, 40,
  ];

  optimalComfortRpmRange(): RpmRange {
    return RpmRange.of(
      RPM.k(this.characteristics[1]),
      RPM.k(this.characteristics[4])
    );
  }

  optimalEcoRpmRange(): RpmRange {
    return RpmRange.of(
      RPM.k(this.characteristics[2]),
      RPM.k(this.characteristics[4])
    );
  }

  angularSpeedForDrifting(): number {
    return this.characteristics[16];
  }

  optimalSportRpmRange(): RpmRange {
    return RpmRange.of(
      RPM.k(this.characteristics[14]),
      RPM.k(this.characteristics[15])
    );
  }
}
