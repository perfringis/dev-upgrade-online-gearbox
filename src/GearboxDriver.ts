import { ExternalSystems } from './ExternalSystems';
import { Gearbox } from './Gearbox';
import { SoundModule } from './SoundModule';

export class GearboxDriver {
  private externalSystems: ExternalSystems = new ExternalSystems();
  private gearbox!: Gearbox;
  private soundModule: SoundModule = new SoundModule();

  private ifCaravan!: boolean;

  // prettier-ignore
  private characteristics: number[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500, 14];

  private gearBoxDriverMode!: number; // mode 1-Eco, 2-Comfort, 3-Sport

  private isMDynamicMode!: boolean;

  private aggressiveMode!: number; // 1-3

  public handleGas(threshold: number): void {
    // prettier-ignore
    if (this.gearbox.getState() === 2) { // park
      return;
    }

    // prettier-ignore
    if (this.gearbox.getState() === 3) { // neutral
      return;
    }

    // prettier-ignore
    if (this.gearbox.getState() === 4) { // neutral
      return;
    }

    if (threshold < 0) {
      throw new Error();
    }

    if (threshold > 100) {
      throw new Error();
    }

    // prettier-ignore
    if (<number>this.gearbox.getCurrentGear() === 0) { // mozna dopisac
      throw new Error();
    }

    switch (this.gearBoxDriverMode) {
      case 1: {
        // prettier-ignore
        if (this.ifCaravan && this.externalSystems.getLights().getLightsPosition() != null && this.externalSystems.getLights().getLightsPosition() >= 7) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
          }
        }

        // prettier-ignore
        if (this.ifCaravan && this.externalSystems.getLights().getLightsPosition() != null && this.externalSystems.getLights().getLightsPosition() <= 3) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
          }
        }

        // prettier-ignore
        if (this.isMDynamicMode && this.externalSystems.getAngularSpeed() > 50) {
          break;
        }

        // prettier-ignore
        if (this.externalSystems.getCurrentRpm() > <number>this.characteristics[0] && this.aggressiveMode === 1) {
          if (!(<number>this.gearbox.getCurrentGear() === this.gearbox.getMaxDrive())) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
          }
        } else if (this.externalSystems.getCurrentRpm() > (<number>this.characteristics[0] * 130) / 100 && this.aggressiveMode === 2) {
          if (!(<number>this.gearbox.getCurrentGear() === this.gearbox.getMaxDrive())) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
          }
        } else if (this.externalSystems.getCurrentRpm() > (<number>this.characteristics[0] * 130) / 100 && this.aggressiveMode === 3) {
          if (!(<number>this.gearbox.getCurrentGear() === this.gearbox.getMaxDrive())) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
              this.soundModule.makeSound(40);
          }
        } else if (this.externalSystems.getCurrentRpm() < this.characteristics[1]) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
          }
        }

        break;
      }

      case 2: {
        // prettier-ignore
        if (this.ifCaravan && this.externalSystems.getLights().getLightsPosition() != null && this.externalSystems.getLights().getLightsPosition() >= 7) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
          }
        }

        // prettier-ignore
        if (this.ifCaravan && this.externalSystems.getLights().getLightsPosition() != null && this.externalSystems.getLights().getLightsPosition() <= 3) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
          }
        }

        // prettier-ignore
        if (this.isMDynamicMode && this.externalSystems.getAngularSpeed() > 50) {
                  break;
        }

        // prettier-ignore
        if (this.externalSystems.getCurrentRpm() < this.characteristics[2]) { // czy redukowac bo za male obroty
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
            break;
          }
        }

        // prettier-ignore
        // czy potrzebny nastepny bieg
        if (threshold < this.characteristics[3] && this.aggressiveMode === 1) {
          if (this.externalSystems.getCurrentRpm() > this.characteristics[4]) {
            if (<number>this.gearbox.getCurrentGear() != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
            }
          }
        } else if (threshold < this.characteristics[3] && this.aggressiveMode === 2) {
          if (this.externalSystems.getCurrentRpm() > (<number>this.characteristics[4] * 130) / 100) {
            if (<number>this.gearbox.getCurrentGear() != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
            }
          }
        }

        if (threshold < this.characteristics[3] && this.aggressiveMode === 3) {
          if (this.externalSystems.getCurrentRpm() > (<number>this.characteristics[4] * 130) / 100) {
            if (<number>this.gearbox.getCurrentGear() != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
              this.soundModule.makeSound(40);
            }
          } else {
            // kickdown(ale jednak redukcja bo TIR)
            if (this.externalSystems.getCurrentRpm() < this.characteristics[5]) {
              // nie sa zbyt wysokie
              if (<number>this.gearbox.getCurrentGear() != 1) {
                this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
              }
            }
          }
          break;
        }
      }

      case 3: {
        // prettier-ignore
        if (this.ifCaravan && this.externalSystems.getLights().getLightsPosition() != null && this.externalSystems.getLights().getLightsPosition() >= 7) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
          }
        }

        // prettier-ignore
        if (this.ifCaravan && this.externalSystems.getLights().getLightsPosition() != null && this.externalSystems.getLights().getLightsPosition() <= 3) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
          }
        }

        // prettier-ignore
        if (this.isMDynamicMode && this.externalSystems.getAngularSpeed() > 50) {
                  break;
        }

        // prettier-ignore
        if (this.externalSystems.getCurrentRpm() < this.characteristics[6]) { // czy zbyt obroty i trzeba zredukowac
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
            break;
          }
        }

        // prettier-ignore
        // czy potrzebny nastepny bieg?
        if (threshold < this.characteristics[7] && this.aggressiveMode === 1) {
          if (this.externalSystems.getCurrentRpm() > this.characteristics[8]) {
            if (<number>this.gearbox.getCurrentGear() != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
            }
          }
        } else if (threshold < this.characteristics[7] && this.aggressiveMode === 2) {
          if (this.externalSystems.getCurrentRpm() > this.characteristics[8] && 130 / 100) {
            if (<number>this.gearbox.getCurrentGear() != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
            }
          }
        } else if (threshold < this.characteristics[7] && this.aggressiveMode === 3) {
          if (this.externalSystems.getCurrentRpm() > this.characteristics[8] && 130 / 100) {
            if (<number>this.gearbox.getCurrentGear() != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
                this.soundModule.makeSound(40);
            }
          }
        } else if (threshold < this.characteristics[9]) {
          // lekki kickdown
          if (this.externalSystems.getCurrentRpm() < this.characteristics[10]) {
            if (<number>this.gearbox.getCurrentGear() != 1) {
              this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
            }
          }
        } else { // mocny kickdown - zapierdalamy! - TO JAKO NOWE WYMAGANIE
          if (this.externalSystems.getCurrentRpm() < this.characteristics[11]) { // nie sa zbyt niskie
            if (<number>this.gearbox.getCurrentGear() != 1) {
              this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
              if (this.gearbox.getCurrentGear() != 1) {
                this.gearbox.setCurrentGear(
                  <number>this.gearbox.getCurrentGear() - 1
                );
              }
            }
          }
        }
      }
    }
  }

  public setGearBox(gearbox: Gearbox): void {
    this.gearbox = gearbox;
  }

  public setIfCaravan(ifCaravan: boolean): void {
    this.ifCaravan = ifCaravan;
  }
}
