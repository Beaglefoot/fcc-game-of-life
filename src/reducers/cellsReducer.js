/*eslint indent: off*/
import { INITIALIZE_CELLS, REVIVE_CELL } from '../actions/cellsActions';

class Cell {
  constructor(id, age = 0) {
    return { id, age };
  }
}

function generateCells(amount) {
  return new Array(amount)
    .fill()
    .map((cell, index) => new Cell(index));
}

function reviveCell(state, id) {
  const newState = [...state];

  newState.splice(
    state.findIndex(cell => cell.id === id),
    1,
    { id, age: 1 }
  );

  return newState;
}

export default function(state = {}, action) {
  const { type, payload } = action;

  switch(type) {
    case INITIALIZE_CELLS:
      return generateCells(payload);
    case REVIVE_CELL:
      return reviveCell(state, payload);
    default:
      return state;
  }
}
