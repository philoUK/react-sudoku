import { useState } from "react";
import { Coordinates } from "./GameTypes";

type SudokuSquareProps = {
  position: Coordinates;
  value?: number;
  onClick: (position: Coordinates) => void;
  selected: boolean;
  applyRightBorder: boolean;
  applyBottomBorder: boolean;
};

export function SudokuSquare({
  position,
  value,
  onClick,
  selected,
  applyRightBorder,
  applyBottomBorder,
}: SudokuSquareProps) {
  const className = `sudoku-square playable ${
    applyRightBorder ? "grid-col-boundary" : ""
  } ${applyBottomBorder ? "grid-row-boundary" : ""} ${
    selected ? "selected" : "selectable"
  }`;
  return (
    <div className={className} onClick={() => onClick(position)}>
      {value}
    </div>
  );
}
