import { Cell, Coordinates, GameResult, MoveResult } from "./GameTypes";

export function isPresetCell(c: Cell) {
  return c.contents.contentType === "preset";
}

export function getCellValue(c: Cell) {
  switch (c.contents.contentType) {
    case "open":
      return c.contents.enteredValue;
    case "preset":
      return c.contents.presetValue;
  }
}

export const getCell = (game: Cell[], position: Coordinates) =>
  game.find(
    (c) => c.position.col === position.col && c.position.row === position.row
  );

export function makeGame(presets: PresetPlaceholder[]) {
  const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const makeCell = (col: number, row: number) => {
    const p = presets.find(
      (p1) => p1.position.col === col && p1.position.row === row
    );
    if (p) {
      return makePresetCell(p);
    }
    return makeEmptyCell({ col: col, row: row });
  };

  let results: Cell[] = [];

  range.map((row) => {
    range.map((col) => results.push(makeCell(col, row)));
  });

  return results;
}

function valuesInColumn(game: Cell[], position: Coordinates) {
  return game
    .filter(
      (c) => c.position.col === position.col && c.position.row !== position.row
    )
    .map(getCellValue)
    .map((v) => (v === undefined ? -1 : v))
    .filter((v) => v !== -1);
}

function valuesInRow(game: Cell[], position: Coordinates) {
  return game
    .filter(
      (c) => c.position.row === position.row && c.position.col !== position.col
    )
    .map(getCellValue)
    .map((v) => (v === undefined ? -1 : v))
    .filter((v) => v !== -1);
}

function validIndices(position: number) {
  switch (position) {
    case 1:
    case 2:
    case 3:
      return [1, 2, 3];
    case 4:
    case 5:
    case 6:
      return [4, 5, 6];
    case 7:
    case 8:
    case 9:
      return [7, 8, 9];
    default:
      return [];
  }
}

function valuesInGrid(game: Cell[], position: Coordinates) {
  const rowIndices = validIndices(position.row);
  const colIndices = validIndices(position.col);
  return game
    .filter((c) => {
      return (
        rowIndices.includes(c.position.row) &&
        colIndices.includes(c.position.col) &&
        !(c.position.col === position.col && c.position.row === position.row)
      );
    })
    .map(getCellValue)
    .map((v) => (v === undefined ? -1 : v))
    .filter((v) => v !== -1);
}

function validValues(game: Cell[], position: Coordinates) {
  let results: number[] = [];
  const cols = valuesInColumn(game, position);
  const rows = valuesInRow(game, position);
  const grid = valuesInGrid(game, position);
  const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return possibleValues.filter(
    (v) =>
      cols.includes(v) === false &&
      rows.includes(v) === false &&
      grid.includes(v) === false
  );
}

// move col, row, value [0-9]
export function play(
  game: Cell[],
  position: Coordinates,
  val: number
): GameResult {
  let newStatus: MoveResult = "valid-move";
  const possibleValues = validValues(game, position);
  const newCells = game.map((c) => {
    if (c.position.col === position.col && c.position.row === position.row) {
      if (isPresetCell(c)) {
        newStatus = "invalid-move";
        return c;
      }
      if (val === 0) return makeEmptyCell(position);
      if (val > 0 && val < 10) {
        if (possibleValues.includes(val)) {
          return setCellValue(c, val);
        }
        newStatus = "invalid-move";
        return c;
      }
    }
    return c;
  });
  // detect a win
  if (newStatus === "valid-move") {
    const hasEmptyCells =
      newCells.filter((c) => c.contents.contentType === "empty").length > 0;
    if (!hasEmptyCells) {
      newStatus = "won";
    }
  }
  return { status: newStatus, game: newCells };
}

export function showHint(game: Cell[], position: Coordinates): GameResult {
  return { status: "show-hint", game: game, hint: validValues(game, position) };
}

function setCellValue(c: Cell, val: number): Cell {
  if (c.contents.contentType === "open" || c.contents.contentType === "empty") {
    if (val > 0 && val < 10) {
      return {
        ...c,
        contents: { contentType: "open", enteredValue: val },
      };
    }
    if (val === 0) {
      return { ...c, contents: { contentType: "empty" } };
    }
  }
  return c;
}

function makeEmptyCell(position: Coordinates) {
  return { position: position, contents: { contentType: "empty" } } as Cell;
}

function makePresetCell(item: PresetPlaceholder) {
  return {
    position: item.position,
    contents: { contentType: "preset", presetValue: item.value },
  } as Cell;
}

export type PresetPlaceholder = {
  position: Coordinates;
  value: number;
};
