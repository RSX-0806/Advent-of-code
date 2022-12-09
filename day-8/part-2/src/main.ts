import { input } from "./input";
export const tree = `30373
25512
65332
33549
35390`
  .split("\n")
  .map((row) => row.split("").map((cell) => Number(cell)));

export const isVisible = (grid: number[][]): void => {
  let score = [];
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      const current = grid[x][y];
      if (
        x === 0 ||
        y === 0 ||
        x === grid.length - 1 ||
        y === grid[0].length - 1
      ) {
        // counter++;
        continue;
      }

      // scan current row to left
      let left = 0;
      for (let k = y - 1; k >= 0; k--) {
        if (current <= grid[x][k]) {
          left++;
          break;
        }
        if (current > grid[x][k]) {
          left++;
        }
      }

      // scan current row to right
      let right = 0;
      for (let k = y + 1; k < grid.length; k++) {
        if (current <= grid[x][k]) {
          right++;
          break;
        }
        if (current > grid[x][k]) {
          right++;
        }
      }

      // scan current column to top
      let top = 0;
      for (let k = x - 1; k >= 0; k--) {
        if (current <= grid[k][y]) {
          top++;
          break;
        }
        if (current > grid[k][y]) {
          top++;
        }
      }

      // scan current column to bot
      let bot = 0;
      for (let k = x + 1; k < grid[0].length; k++) {
        if (current <= grid[k][y]) {
          bot++;
          break;
        }
        if (current > grid[k][y]) {
          bot++;
        }
      }
      if (x === 2 && y === 1) {
        console.log(top * bot * left * right);
      }
      score.push(top * bot * left * right);
    }
  }
  console.log("visible trees: ", Math.max(...score));
};

isVisible(input);
