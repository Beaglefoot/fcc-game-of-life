/*eslint indent: off*/
import { REVIVE_CELL } from '../actions/cellsActions';
import { NEXT_GENERATION } from '../actions/generationActions';

import defaultBoard from '../defaultBoard';

class Cell {
  constructor(id, age = 0) {
    return { id, age };
  }
}

export function generateCells(amount) {
  return new Array(amount)
    .fill()
    .map((cell, index) => new Cell(index));
}

function reviveCell(cells, id) {
  const updatedCells = [...cells];

  updatedCells.splice(
    cells.findIndex(cell => cell.id === id),
    1,
    { id, age: 1 }
  );

  return updatedCells;
}

const initialState = {
  board: defaultBoard,
  cells: generateCells(defaultBoard.rows * defaultBoard.columns),
  generation: 0
};



export default function(state = initialState, action) {
  if (!action) return state;

  switch(action.type) {
    case REVIVE_CELL:
      return { ...state, cells: reviveCell(state.cells, action.id) };
    case NEXT_GENERATION:
      return { ...state, generation: state.generation + 1 };
    default:
      return state;
  }
}
