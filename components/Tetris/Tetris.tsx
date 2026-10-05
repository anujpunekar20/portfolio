"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { unlockAchievement } from "@/lib/achievements";
import { PLAY_TETRIS_EVENT } from "@/lib/events";
import {
  BLOCK_SIZE,
  collides,
  computeBlocks,
  createGrid,
  dropRow,
  lockPiece,
  rotateMatrix,
  spawnPiece,
  type Block,
  type Cell,
  type Piece,
} from "@/lib/tetris";
import styles from "./Tetris.module.css";

const TICK_MS = 550;
const HIGH_SCORE_KEY = "tetris-high-score";

// On-screen buttons replay the matching key, so they share the keyboard's code path.
const touchControls = [
  { label: "←", key: "ArrowLeft", name: "Move left" },
  { label: "↻", key: "ArrowUp", name: "Rotate" },
  { label: "→", key: "ArrowRight", name: "Move right" },
  { label: "↓", key: "ArrowDown", name: "Soft drop" },
  { label: "⤓", key: " ", name: "Hard drop" },
];

export function Tetris() {
  const [active, setActive] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [boardSize, setBoardSize] = useState({ rows: 0, cols: 0 });

  const gridRef = useRef<Cell[][]>([]);
  const pieceRef = useRef<Piece | null>(null);

  const startGame = useCallback(() => {
    setBoardSize({
      cols: Math.floor(window.innerWidth / 2 / BLOCK_SIZE),
      rows: Math.floor(window.innerHeight / 2 / BLOCK_SIZE),
    });
    setScore(0);
    try {
      setHighScore(Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0);
    } catch {
      // storage blocked (private mode etc.): the best score just isn't remembered
    }
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
    let upcomingPiece = spawnPiece(cols);
    let currentScore = 0;

    const render = () => {
      setBlocks(computeBlocks(gridRef.current, pieceRef.current));
      setNextPiece(upcomingPiece);
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
        if (cleared > 0) {
          currentScore += cleared * 100;
          setScore(currentScore);
          try {
            if (currentScore > Number(localStorage.getItem(HIGH_SCORE_KEY)))
              localStorage.setItem(HIGH_SCORE_KEY, String(currentScore));
          } catch {
            // storage blocked: keep playing without saving
          }
          unlockAchievement("line-clear");
        }

        const next = upcomingPiece;
        if (
          collides(gridRef.current, next.matrix, next.row, next.col, rows, cols)
        ) {
          setActive(false);
          return;
        }
        pieceRef.current = next;
        upcomingPiece = spawnPiece(cols);
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
          piece.row = dropRow(gridRef.current, piece, rows, cols);
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
        <span>
          SCORE{" "}
          <span key={score} className={score > 0 ? styles.scoreUp : ""}>
            {score}
          </span>{" "}
          · BEST {Math.max(score, highScore)}
        </span>
        <span className={styles.keyHints}>
          ←→ move · ↑ rotate · ↓ soft drop · SPACE hard drop · ESC exit
        </span>
        {nextPiece && (
          <div className={styles.nextPiece}>
            NEXT
            <div
              className={styles.nextPieceGrid}
              style={{
                gridTemplateColumns: `repeat(${nextPiece.matrix[0].length}, 0.75rem)`,
              }}
            >
              {nextPiece.matrix.flat().map((filled, i) => (
                <div
                  key={i}
                  style={{ background: filled ? nextPiece.color : undefined }}
                />
              ))}
            </div>
          </div>
        )}
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
      <div className={styles.touchControls}>
        {touchControls.map((control) => (
          <button
            key={control.name}
            className={styles.touchButton}
            aria-label={control.name}
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: control.key }),
              )
            }
          >
            {control.label}
          </button>
        ))}
      </div>
    </>
  );
}
