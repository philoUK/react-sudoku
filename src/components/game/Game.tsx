import { useEffect, useState } from "react";
import {
  getCell,
  getCellValue,
  isPresetCell,
  makeGame,
  play,
  PresetPlaceholder,
  showHint,
} from "./GameLogic";

import { Cell, Coordinates } from "./GameTypes";
import { FixedSudokuSquare } from "./FixedSudokuSquare";
import { SudokuSquare } from "./SudokuSquare";

function makePreset(col: number, row: number, val: number): PresetPlaceholder {
  return { position: { col: col, row: row }, value: val };
}

export function Game() {
  const [game, updateGame] = useState<Cell[]>(
    makeGame([
      makePreset(3, 1, 2),
      makePreset(4, 1, 7),
      makePreset(5, 1, 8),
      makePreset(9, 1, 3),
      makePreset(6, 2, 9),
      makePreset(7, 2, 8),
      makePreset(9, 2, 1),
      makePreset(1, 3, 4),
      makePreset(6, 3, 3),
      makePreset(8, 3, 7),
      makePreset(1, 4, 9),
      makePreset(3, 4, 5),
      makePreset(6, 4, 8),
      makePreset(5, 5, 7),
      makePreset(4, 6, 5),
      makePreset(7, 6, 4),
      makePreset(9, 6, 8),
      makePreset(2, 7, 6),
      makePreset(4, 7, 4),
      makePreset(9, 7, 7),
      makePreset(1, 8, 3),
      makePreset(3, 8, 9),
      makePreset(4, 8, 8),
      makePreset(1, 9, 8),
      makePreset(5, 9, 3),
      makePreset(6, 9, 1),
      makePreset(7, 9, 6),
    ])
  );

  const [selectedCell, updateSelectedCell] = useState<Coordinates>();

  const [validMove, setValidMove] = useState<boolean | undefined>();

  const [hintRequested, setHintRequested] = useState<boolean>(false);

  const [hint, setHit] = useState<number[] | undefined>();

  function onKeyPress(e: KeyboardEvent) {
    const key = e.key;
    if (!selectedCell) return;
    if (!key.match(/^[h0-9]$/)) return;

    e.preventDefault();
    const newGame =
      key === "h"
        ? showHint(game, selectedCell)
        : play(game, selectedCell, parseInt(key));
    updateGame(newGame.game);
    setValidMove(newGame.status !== "invalid-move");
    setHintRequested(newGame.status === "show-hint");
    setHit(newGame.hint);
  }

  const moveSelection = (
    newCol: number,
    newRow: number,
    fnPreventDefault: () => void
  ) => {
    if (newCol > 0 && newCol < 10 && newRow > 0 && newRow < 10) {
      const position: Coordinates = { col: newCol, row: newRow };
      const cell = getCell(game, position);
      if (cell === undefined) return;
      if (!isPresetCell(cell)) {
        fnPreventDefault();
        updateSelectedCell(position);
      }
    }
  };

  function onKeyDown(e: KeyboardEvent) {
    if (!selectedCell) {
      return;
    }
    const { col, row } = selectedCell;
    const preventDefault = () => e.preventDefault();

    switch (e.code) {
      case "ArrowUp":
        moveSelection(col, row - 1, preventDefault);
        break;
      case "ArrowLeft":
        moveSelection(col - 1, row, preventDefault);
        break;
      case "ArrowRight":
        moveSelection(col + 1, row, preventDefault);
        break;
      case "ArrowDown":
        moveSelection(col, row + 1, preventDefault);
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keypress", onKeyPress);
    return () => {
      document.removeEventListener("keypress", onKeyPress);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedCell, game]);

  function onCellSelected(position: Coordinates) {
    updateSelectedCell(position);
  }

  function isSelected(position: Coordinates) {
    if (selectedCell) {
      return (
        selectedCell.col === position.col && selectedCell.row === position.row
      );
    }
    return false;
  }

  function makeKey(cell: Cell) {
    return `${cell.position.col},${cell.position.row}`;
  }

  function makeSquare(cell: Cell) {
    if (isPresetCell(cell)) {
      return (
        <FixedSudokuSquare
          value={getCellValue(cell) as number}
          key={makeKey(cell)}
        />
      );
    }
    return (
      <SudokuSquare
        position={cell.position}
        value={getCellValue(cell)}
        selected={isSelected(cell.position)}
        key={makeKey(cell)}
        onClick={onCellSelected}
      />
    );
  }

  return (
    <>
      {validMove === false && <div className="oh-no">Invalid Move</div>}
      {hintRequested && <div className="hint">{hint}</div>}
      <div
        style={{
          maxWidth: "601px",
          background: "black",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto auto auto auto",
        }}
      >
        {game.map((cell) => makeSquare(cell))}
      </div>
    </>
  );
}
