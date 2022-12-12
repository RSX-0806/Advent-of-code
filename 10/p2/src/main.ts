import { instructions, screen } from "./instructions";

class CPU {
  x: number; // register X value
  cycle: number; // cycle counter
  sprite: number[];
  SCREEN: string[][];
  position: number[];

  constructor(screen: string[][]) {
    this.x = 1;
    this.cycle = 0;
    this.sprite = [0, 1, 2];
    this.position = [0, 0];
    this.SCREEN = screen;
  }

  // increment cycle twice and add v into X
  addx(v: number): void {
    this.addCycle();
    this.addCycle();
    this.x += v;
    this.sprite = [this.x - 1, this.x, this.x + 1];
  }

  // increment cycle once
  noop(): void {
    this.addCycle();
  }

  // increment cycle and handle signalStrength/total logic
  addCycle() {
    this.cycle++;

    if ([41, 81, 121, 161, 201].includes(this.cycle)) {
      this.position[0]++;
      this.position[1] = 0;
    }

    this.draw(this.position);
  }

  draw(position: number[]): void {
    const [x, y] = [...position];
    
    this.sprite.includes(y)
      ? (this.SCREEN[x][y] = "#")
      : (this.SCREEN[x][y] = ".");

    this.position[1]++;
  }

  // batch instrucions list & execute appropriate instruction
  // return CRT Screen matrix
  execute(instructions: string[]): string[][] {
    for (const instruction of instructions) {
      if (instruction.split(" ").length === 1) {
        this.noop();
      } else {
        const value = Number(instruction.split(" ")[1]);
        this.addx(value);
      }
    }
    return this.SCREEN;
  }
}

const crt = () => {
  const cpu = new CPU(screen);
  const output = cpu.execute(instructions);
  for (let i = 0; i < output.length; i++) {
    let currentRow = "";
    for (let j = 0; j < output[i].length; j++) {
      currentRow += output[i][j];
    }
    console.log(currentRow);
  }
};

crt();
