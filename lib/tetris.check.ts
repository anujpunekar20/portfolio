// Run with `node lib/tetris.check.ts`.
import assert from "node:assert";
import { createGrid, dropRow, type Piece } from "./tetris.ts";

const square: Piece = {
  matrix: [
    [1, 1],
    [1, 1],
  ],
  row: 0,
  col: 0,
  color: "red",
};

// Empty 6x4 board: the square rests on the floor (rows 4-5).
assert.equal(dropRow(createGrid(6, 4), square, 6, 4), 4);

// A block at row 3, col 1: the square stops just above it (rows 1-2).
const grid = createGrid(6, 4);
grid[3][1] = "red";
assert.equal(dropRow(grid, square, 6, 4), 1);

// A block in a column the square doesn't cover doesn't stop it.
assert.equal(dropRow(grid, { ...square, col: 2 }, 6, 4), 4);

console.log("tetris ok");
