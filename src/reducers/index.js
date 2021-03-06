/*eslint indent: off*/
import { REVIVE_CELL, RANDOMIZE_CELLS } from '../actions/cellsActions';
import { NEXT_GENERATION, RESET_GENERATION, PREVIOUS_GENERATION } from '../actions/generationActions';

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

export function reviveCell(cells, id) {
  const updatedCells = [...cells];

  updatedCells.splice(
    cells.findIndex(cell => cell.id === id),
    1,
    { id, age: 1 }
  );

  return updatedCells;
}

function getAllNeighborCellIdsMemo() {
  const neighborCache = [];

  return function getAllNeighborCellIds(state, id) {
    if (neighborCache[id]) return neighborCache[id];

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
      return newId >= 0 ? newId : newId + cellsAmount;
    }

    function incColumn(id) {
      const newId = id + 1;
      return getRowDifference(id, newId) < 0 ? newId - columns : newId;
    }

    function decColumn(id) {
      const newId = id - 1;
      return getRowDifference(id, newId) > 0 ? newId + columns : newId;
    }

    const upperCellId = decRow(id);
    const lowerCellId = incRow(id);

    neighborCache[id] = [
      decColumn(id),
      incColumn(id),
      decColumn(upperCellId),
      upperCellId,
      incColumn(upperCellId),
      decColumn(lowerCellId),
      lowerCellId,
      incColumn(lowerCellId)
    ];

    return neighborCache[id];
  };
}

export const getAllNeighborCellIds = getAllNeighborCellIdsMemo();

export function countAliveCells(state, id) {
  let neighborIds = [...getAllNeighborCellIds(state, id)];

  let cells = [];
  let len = neighborIds.length;

  state.cells.some(cell => {
    if (neighborIds.includes(cell.id)) cells.push(cell);
    if (cells.length === len) return true;
  });

  return cells.filter(cell => cell.age > 0).length;
}

export function calcNewGeneration(state) {
  return state.cells.map(cell => {
    const { id, age } = cell;
    const count = countAliveCells(state, id);

    // Revive dead cells
    if (age === 0) {
      if (count === 3) return { ...cell, age: 1 };
      else return cell;
    }
    // Kill cells
    else {
      if (count < 2 || count > 3) return { ...cell, age: 0 };
      else return { ...cell, age: age + 1 };
    }
  });
}

function getRandomInt(min, max, modifier) {
  return Math.floor(Math.random() * modifier * (max - min)) + min;
}

function getRandomizedState(state) {
  const cells = state.cells.map(cell => ({ ...cell, age: getRandomInt(0, 2, 0.6) }));
  return { ...state, cells };
}

function addToHistory(state) {
  const limit = 40;
  const { cells, generation } = state;
  let { history } = state;

  if (history.length >= limit) history = history.slice(0, -1);
  return [{ cells, generation }].concat(history);
}

function getStateFromHistory(state) {
  if (!state.history.length) return state;
  const history = [ ...state.history ];
  const { cells, generation } = history.shift();
  return { ...state, cells, generation, history };
}

const initialState = {
  board: defaultBoard,
  cells: generateCells(defaultBoard.rows * defaultBoard.columns),
  generation: 0,
  history: []
};



export default function(state = getRandomizedState(initialState), action) {
  if (!action) return state;

  switch(action.type) {
    case REVIVE_CELL:
      return { ...state, cells: reviveCell(state.cells, action.id) };
    case NEXT_GENERATION:
      return {
        ...state,
        generation: state.generation + 1,
        cells: calcNewGeneration(state),
        history: addToHistory(state)
      };
    case RESET_GENERATION:
      return initialState;
    case RANDOMIZE_CELLS:
      return getRandomizedState(state);
    case PREVIOUS_GENERATION:
      return getStateFromHistory(state);
    default:
      return state;
  }
}
