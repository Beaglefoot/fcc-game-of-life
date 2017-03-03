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

export function getAllNeighborCells(state, id) {
  const { rows, columns } = state.board;
  const cellsAmount = rows * columns;

  function getRowDifference(id1, id2) {
    return Math.floor(id1 / columns) - Math.floor(id2 / columns);
  }

  function incRow(id) {
    const newId = id + columns;
    return newId < cellsAmount ? newId : newId - cellsAmount;
  }

  function decRow(id) {
    const newId = id - columns;
    return newId > 0 ? newId : newId + cellsAmount;
  }

  function incColumn(id) {
    const newId = id + 1;
    return getRowDifference(id, newId) < 0 ? newId - columns : newId;
  }

  function decColumn(id) {
    const newId = id - 1;
    return getRowDifference(id, newId) > 0 ? newId + columns : newId;
  }

  const upperCellId = incRow(id);
  const lowerCellId = decRow(id);

  const neighborIds = [
    decColumn(id),
    incColumn(id),
    decColumn(upperCellId),
    upperCellId,
    incColumn(upperCellId),
    decColumn(lowerCellId),
    lowerCellId,
    incColumn(lowerCellId)
  ];

  return state.cells.filter(cell => neighborIds.includes(cell.id));
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
