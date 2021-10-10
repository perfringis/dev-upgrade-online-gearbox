export class Gearbox {
  private maxDrive!: number;
  private gearBoxCurrentParams: Array<number> = new Array<number>(2); //state, currentGear

  constructor() {}

  //state 1-Drive, 2-Park, 3-Reverse, 4-Neutral
  public getState(): number {
    return this.gearBoxCurrentParams[0];
  }

  public getCurrentGear(): number {
    return this.gearBoxCurrentParams[1];
  }

  public setCurrentGear(currentGear: number): void {
    this.gearBoxCurrentParams[1] = currentGear;
  }

  public setGearBoxCurrentParams(gearBoxCurrentParams: number[]): void {
    if (gearBoxCurrentParams[0] != this.gearBoxCurrentParams[0]) {
      //zmienil sie state
      this.gearBoxCurrentParams[0] = gearBoxCurrentParams[0];

      const state: number = gearBoxCurrentParams[0];
      if (state == 2) {
        this.setCurrentGear(0);
      }
      
      if (state == 3) {
        this.setCurrentGear(-1);
      }

      if (state == 4) {
        this.setCurrentGear(0);
      }

      this.setCurrentGear(gearBoxCurrentParams[1]);
    } else {
      this.setCurrentGear(gearBoxCurrentParams[1]);
    }
  }

  public getMaxDrive(): number {
    return this.maxDrive;
  }

  public setMaxDrive(maxDrive: number): void {
    this.maxDrive = maxDrive;
  }
}
