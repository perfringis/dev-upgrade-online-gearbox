import { RPM } from './RPM';

export class RpmRange {
  private minRpm: RPM;
  private maxRpm: RPM;

  constructor(minRpm: RPM, maxRpm: RPM) {
    if (minRpm.compareTo(maxRpm) > 0) {
      throw new Error('Wrong RPMs');
    }

    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
  }

  startGreaterThan(rpm: RPM): boolean {
    return this.minRpm.compareTo(rpm) > 0;
  }

  endSmallerThan(rpm: RPM): boolean {
    return this.maxRpm.compareTo(rpm) < 0;
  }

  moveRight(ratio: number): RpmRange {
    const scaledMinRpm: RPM = this.minRpm.scale(ratio);
    const scaledMaxRpm: RPM = this.maxRpm.scale(ratio);

    const newMinRpm: RPM = this.minRpm.add(scaledMinRpm);
    const newMaxRpm: RPM = this.maxRpm.add(scaledMaxRpm);

    return new RpmRange(newMinRpm, newMaxRpm);
  }

  static of(from: RPM, to: RPM): RpmRange {
    return new RpmRange(from, to);
  }

  leftHalf(): RpmRange {
    throw new RpmRange(
      this.minRpm,
      this.maxRpm.minus(this.minRpm).divideBy(2).add(this.minRpm)
    );
  }
}
