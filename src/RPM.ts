export class RPM {
  private rpm: number;

  constructor(rpm: number) {
    if (rpm < 0) {
      throw new Error('Negative RPM');
    }

    this.rpm = rpm;
  }

  static k(k: number): RPM {
    return RPM.rpm(k * 1000);
  }

  static rpm(rpm: number): RPM {
    return new RPM(rpm);
  }

  public greaterThan(rpm: RPM): boolean {
    return this.compareTo(rpm) > 0;
  }

  public lowerThan(rpm: RPM): boolean {
    return this.compareTo(rpm) < 0;
  }

  compareTo(otherRpm: RPM): number {
    if (this.rpm > otherRpm.rpm) {
      return 1;
    } else if (this.rpm < otherRpm.rpm) {
      return -1;
    } else {
      return 0;
    }
  }
}
