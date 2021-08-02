import { RPM } from './RPM';
import { RpmRange } from './RpmRange';

export class Characteristics {
  private characteristics: number[] = [
    2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500,
    2000, 3000, 6500, 14,
  ];

  optimalEcoRpmRange(): RpmRange {
    return new RpmRange(
      RPM.k(this.characteristics[1]),
      RPM.k(this.characteristics[4])
    );
  }

  optimalComfortRpmRange(): RpmRange {
    return new RpmRange(
      RPM.k(this.characteristics[1]),
      RPM.k(this.characteristics[4])
    );
  }

  optimalSportRpmRange(): RpmRange {
    return new RpmRange(
      RPM.k(this.characteristics[1]),
      RPM.k(this.characteristics[4])
    );
  }
}
