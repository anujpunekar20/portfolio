"use client";

import { useEffect, useRef, useState } from "react";
import {
  BLOCK,
  collides,
  computeBlocks,
  createGrid,
  lockPiece,
  rotateMatrix,
  spawnPiece,
  type Block,
  type Cell,
  type Piece,
} from "@/lib/tetris";
import styles from "./Tetris.module.css";

const TICK_MS = 550;

export function Tetris() {
  const [active, setActive] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [score, setScore] = useState(0);
  const [dims, setDims] = useState({ rows: 0, cols: 0 });

  const gridRef = useRef<Cell[][]>([]);
  const pieceRef = useRef<Piece | null>(null);

  useEffect(() => {
    if (!active) return;

    const { rows, cols } = dims;
    gridRef.current = createGrid(rows, cols);
    pieceRef.current = spawnPiece(cols);

    const render = () => {
      setBlocks(computeBlocks(gridRef.current, pieceRef.current));
    };

    const tick = () => {
      const piece = pieceRef.current;
      if (!piece) return;

      if (
        !collides(
          gridRef.current,
          piece.matrix,
          piece.row + 1,
          piece.col,
          rows,
          cols,
        )
      ) {
        piece.row++;
      } else {
        const { grid, cleared } = lockPiece(gridRef.current, piece, cols);
        gridRef.current = grid;
        if (cleared > 0) setScore((s) => s + cleared * 100);

        const next = spawnPiece(cols);
        if (
          collides(gridRef.current, next.matrix, next.row, next.col, rows, cols)
        ) {
          setActive(false);
          return;
        }
        pieceRef.current = next;
      }
      render();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const piece = pieceRef.current;
      if (!piece) return;

      switch (e.key) {
        case "Escape":
          setActive(false);
          break;
        case "ArrowLeft":
          if (
            !collides(
              gridRef.current,
              piece.matrix,
              piece.row,
              piece.col - 1,
              rows,
              cols,
            )
          ) {
            piece.col--;
            render();
          }
          break;
        case "ArrowRight":
          if (
            !collides(
              gridRef.current,
              piece.matrix,
              piece.row,
              piece.col + 1,
              rows,
              cols,
            )
          ) {
            piece.col++;
            render();
          }
          break;
        case "ArrowDown":
          tick();
          break;
        case "ArrowUp": {
          const rotated = rotateMatrix(piece.matrix);
          if (
            !collides(
              gridRef.current,
              rotated,
              piece.row,
              piece.col,
              rows,
              cols,
            )
          ) {
            piece.matrix = rotated;
            render();
          }
          break;
        }
        case " ":
          e.preventDefault();
          while (
            !collides(
              gridRef.current,
              piece.matrix,
              piece.row + 1,
              piece.col,
              rows,
              cols,
            )
          ) {
            piece.row++;
          }
          tick();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(tick, TICK_MS);
    render();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
      pieceRef.current = null;
      setBlocks([]);
    };
  }, [active, dims]);

  if (!active) {
    const handlePlay = () => {
      setDims({
        cols: Math.floor(window.innerWidth / 2 / BLOCK),
        rows: Math.floor(window.innerHeight / 2 / BLOCK),
      });
      setScore(0);
      setActive(true);
    };

    return (
      <button className={styles.playButton} onClick={handlePlay}>
        ▶ PLAY
      </button>
    );
  }

  const { rows, cols } = dims;

  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.hud}>
        SCORE {score} · ←→ move · ↑ rotate · ↓ drop · ESC exit
      </div>
      <button className={styles.exitButton} onClick={() => setActive(false)}>
        EXIT
      </button>
      <div
        className={styles.board}
        style={{ width: cols * BLOCK, height: rows * BLOCK }}
      >
        {blocks.map((block) => (
          <div key={block.key} style={block.style} />
        ))}
      </div>
    </>
  );
}
