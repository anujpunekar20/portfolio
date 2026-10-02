export type Cell = string | null;
export type Matrix = number[][];

export type Piece = {
  matrix: Matrix;
  row: number;
  col: number;
  color: string;
};

export type Block = {
  key: string;
  style: {
    position: "absolute";
    left: number;
    top: number;
    width: number;
    height: number;
    background: string;
    border: string;
    zIndex: number;
    boxSizing: "border-box";
  };
};

export const BLOCK = 32;

export const TETROMINOES: Record<string, Matrix> = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  J: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
};

export const COLORS: Record<string, string> = {
  I: "var(--void-accent)",
  O: "var(--void-text-primary)",
  T: "var(--void-text-muted)",
  S: "var(--void-accent)",
  Z: "var(--void-destructive)",
  L: "var(--void-text-primary)",
  J: "var(--void-text-muted)",
};

export function createGrid(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () => Array<Cell>(cols).fill(null));
}

export function spawnPiece(cols: number): Piece {
  const keys = Object.keys(TETROMINOES);
  const key = keys[Math.floor(Math.random() * keys.length)];
  const matrix = TETROMINOES[key];
  return {
    matrix,
    row: 0,
    col: Math.floor(cols / 2) - Math.floor(matrix[0].length / 2),
    color: COLORS[key],
  };
}

export function collides(
  grid: Cell[][],
  matrix: Matrix,
  row: number,
  col: number,
  rows: number,
  cols: number,
): boolean {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (!matrix[r][c]) continue;
      const gr = row + r;
      const gc = col + c;
      if (gc < 0 || gc >= cols || gr >= rows) return true;
      if (gr >= 0 && grid[gr][gc]) return true;
    }
  }
  return false;
}

// TODO(human): implement a 90-degree clockwise rotation of a binary matrix.
// Given `m` (rows x cols), return a new matrix (cols x rows) rotated 90deg
// clockwise, without mutating `m`.
export function rotateMatrix(m: Matrix): Matrix {
  // throw new Error("not implemented");
  const transpose = Array.from({ length: m[0].length }, () =>
    Array(m.length).fill(0),
  );
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      transpose[j][i] = m[i][j];
    }
  }
  return transpose.map((r) => r.reverse());
}

export function lockPiece(
  grid: Cell[][],
  piece: Piece,
  cols: number,
): { grid: Cell[][]; cleared: number } {
  const next = grid.map((row) => row.slice());
  for (let r = 0; r < piece.matrix.length; r++) {
    for (let c = 0; c < piece.matrix[r].length; c++) {
      if (!piece.matrix[r][c]) continue;
      const gr = piece.row + r;
      const gc = piece.col + c;
      if (gr >= 0) next[gr][gc] = piece.color;
    }
  }

  let cleared = 0;
  for (let r = next.length - 1; r >= 0; r--) {
    if (next[r].every((cell) => cell)) {
      next.splice(r, 1);
      next.unshift(Array<Cell>(cols).fill(null));
      cleared++;
      r++;
    }
  }

  return { grid: next, cleared };
}

export function computeBlocks(grid: Cell[][], piece: Piece | null): Block[] {
  const blocks: Block[] = [];
  const size = BLOCK - 2;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const color = grid[r][c];
      if (!color) continue;
      blocks.push({
        key: `g${r}-${c}`,
        style: {
          position: "absolute",
          left: c * BLOCK,
          top: r * BLOCK,
          width: size,
          height: size,
          background: color,
          border: "1px solid rgba(240,240,240,0.25)",
          zIndex: 99,
          boxSizing: "border-box",
        },
      });
    }
  }

  if (piece) {
    for (let r = 0; r < piece.matrix.length; r++) {
      for (let c = 0; c < piece.matrix[r].length; c++) {
        if (!piece.matrix[r][c]) continue;
        const gr = piece.row + r;
        const gc = piece.col + c;
        blocks.push({
          key: `p${gr}-${gc}`,
          style: {
            position: "absolute",
            left: gc * BLOCK,
            top: gr * BLOCK,
            width: size,
            height: size,
            background: piece.color,
            border: "1px solid rgba(240,240,240,0.4)",
            zIndex: 99,
            boxSizing: "border-box",
          },
        });
      }
    }
  }

  return blocks;
}
