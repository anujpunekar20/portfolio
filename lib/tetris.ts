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

export const BLOCK_SIZE = 32;

const TETROMINOES: Record<string, Matrix> = {
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

const TETROMINO_COLORS: Record<string, string> = {
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
    color: TETROMINO_COLORS[key],
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
      const gridRow = row + r;
      const gridCol = col + c;
      if (gridCol < 0 || gridCol >= cols || gridRow >= rows) return true;
      if (gridRow >= 0 && grid[gridRow][gridCol]) return true;
    }
  }
  return false;
}

export function rotateMatrix(matrix: Matrix): Matrix {
  const transpose = Array.from({ length: matrix[0].length }, () =>
    Array(matrix.length).fill(0),
  );
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      transpose[j][i] = matrix[i][j];
    }
  }
  return transpose.map((row) => row.reverse());
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
      const gridRow = piece.row + r;
      const gridCol = piece.col + c;
      if (gridRow >= 0) next[gridRow][gridCol] = piece.color;
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
  const innerSize = BLOCK_SIZE - 2;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const color = grid[r][c];
      if (!color) continue;
      blocks.push({
        key: `g${r}-${c}`,
        style: {
          position: "absolute",
          left: c * BLOCK_SIZE,
          top: r * BLOCK_SIZE,
          width: innerSize,
          height: innerSize,
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
        const gridRow = piece.row + r;
        const gridCol = piece.col + c;
        blocks.push({
          key: `p${gridRow}-${gridCol}`,
          style: {
            position: "absolute",
            left: gridCol * BLOCK_SIZE,
            top: gridRow * BLOCK_SIZE,
            width: innerSize,
            height: innerSize,
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
