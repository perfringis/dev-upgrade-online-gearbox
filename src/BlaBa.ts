export class BlaBla {
  private minRpm: number;
  private maxRpm: number;
  private minDrive: number = 1;
  private maxDrive: number;

  constructor(minRpm: number, maxRpm: number, maxDrive: number) {
    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
    this.maxDrive = maxDrive;
  }

  public invoke(currentRpm: number, currentGear: number): number {
    if (currentRpm > this.maxRpm) {
      if (currentGear === this.maxDrive) {
        return currentGear;
      }
      return currentGear + 1;
    } else if (currentRpm < this.minRpm) {
      if (currentGear === this.minDrive) {
        return currentGear;
      }
      return currentGear - 1;
    } else {
      return currentGear;
    }
  }
}
