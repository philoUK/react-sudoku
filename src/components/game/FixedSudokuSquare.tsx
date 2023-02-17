type FixedSudokuSquareProps = {
  value: number;
  applyRightBorder: boolean;
  applyBottomBorder: boolean;
};

export function FixedSudokuSquare({
  value,
  applyRightBorder,
  applyBottomBorder,
}: FixedSudokuSquareProps) {
  const className = `sudoku-square fixed ${
    applyRightBorder ? "grid-col-boundary" : ""
  } ${applyBottomBorder ? "grid-row-boundary" : ""}`;
  return <div className={className}>{value}</div>;
}
