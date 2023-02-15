export type PresetCellContents = {
  contentType: "preset";
  presetValue: number;
};

export type ChangeableCellContents = {
  contentType: "open";
  enteredValue: number;
};

export type EmptyCellContents = {
  contentType: "empty";
};

export type CellContents =
  | PresetCellContents
  | ChangeableCellContents
  | EmptyCellContents;

export type Cell = {
  position: Coordinates;
  contents: CellContents;
};

export type Coordinates = {
  col: number;
  row: number;
};

export type MoveResult = "won" | "valid-move" | "invalid-move" | "show-hint";

export type GameResult = {
  status: MoveResult;
  game: Cell[];
  hint?: number[];
};
