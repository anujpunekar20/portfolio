"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PLAY_TETRIS_EVENT } from "@/lib/events";
import {
  BLOCK_SIZE,
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
  const [boardSize, setBoardSize] = useState({ rows: 0, cols: 0 });

  const gridRef = useRef<Cell[][]>([]);
  const pieceRef = useRef<Piece | null>(null);

  const startGame = useCallback(() => {
    setBoardSize({
      cols: Math.floor(window.innerWidth / 2 / BLOCK_SIZE),
      rows: Math.floor(window.innerHeight / 2 / BLOCK_SIZE),
    });
    setScore(0);
    setActive(true);
  }, []);

  useEffect(() => {
    window.addEventListener(PLAY_TETRIS_EVENT, startGame);
    return () => window.removeEventListener(PLAY_TETRIS_EVENT, startGame);
  }, [startGame]);

  useEffect(() => {
    if (!active) return;

    const { rows, cols } = boardSize;
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
        if (cleared > 0)
          setScore((previousScore) => previousScore + cleared * 100);

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

    const handleKeyDown = (event: KeyboardEvent) => {
      // ignore keys typed into the command palette's input while a game is running
      if (event.target instanceof HTMLInputElement) return;

      const piece = pieceRef.current;
      if (!piece) return;

      switch (event.key) {
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
          event.preventDefault();
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
  }, [active, boardSize]);

  if (!active) {
    return (
      <button className={styles.playButton} onClick={startGame}>
        ▶ PLAY
      </button>
    );
  }

  const { rows, cols } = boardSize;

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
        style={{ width: cols * BLOCK_SIZE, height: rows * BLOCK_SIZE }}
      >
        {blocks.map((block) => (
          <div key={block.key} style={block.style} />
        ))}
      </div>
    </>
  );
}
