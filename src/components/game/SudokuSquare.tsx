import { useState } from "react";
import { Coordinates } from "./GameTypes";

type SudokuSquareProps = {
  position: Coordinates;
  value?: number;
  onClick: (position: Coordinates) => void;
  selected: boolean;
};

export function SudokuSquare({
  position,
  value,
  onClick,
  selected,
}: SudokuSquareProps) {
  const className = `sudoku-square ${selected ? "selected" : "selectable"}`;
  return (
    <div className={className} onClick={() => onClick(position)}>
      {value}
    </div>
  );
}
