type FixedSudokuSquareProps = {
  value: number;
};

export function FixedSudokuSquare({ value }: FixedSudokuSquareProps) {
  return <div className="sudoku-square">{value}</div>;
}
