import { instructions } from "./instructions";

class CPU {
  x: number; // register X value
  cycle: number; // cycle counter
  signalStrength: number;
  total: number; // sum of [20, 60, 100, 140, 180, 220] signals

  constructor() {
    this.x = 1;
    this.cycle = 0;
    this.signalStrength = 0;
    this.total = 0;
  }

  // increment cycle twice and add v into X
  addx(v: number): void {
    this.addCycle();
    this.addCycle();
    this.x += v;
  }

  // increment cycle once
  noop(): void {
    this.addCycle();
  }

  // increment cycle and handle signalStrength/total logic
  addCycle() {
    this.cycle++;
    if ([20, 60, 100, 140, 180, 220].includes(this.cycle)) {
      this.signalStrength = this.x * this.cycle;
      this.total += this.signalStrength;
      console.log(
        `Cycle ${this.cycle}th, register X has the value ${this.x}, so the signal strength is ${this.cycle} * ${this.x} = ${this.signalStrength}.`
      );
    }
  }

  // batch & execute instructions 
  execute(instructions: string[]): void {
    for (const instruction of instructions) {
      if (instruction.split(" ").length === 1) {
        this.noop();
      } else {
        const value = Number(instruction.split(" ")[1]);
        this.addx(value);
      }
    }
    console.log(`The sum of these signal strengths is ${this.total}.`);
  }
}

const crt = () => {
  const cpu = new CPU();
  cpu.execute(instructions);
};

crt();
