export const INITIALIZE_CELLS = 'INITIALIZE_CELLS';
export const REVIVE_CELL = 'REVIVE_CELL';

export function initializeCells(amount) {
  return {
    type: INITIALIZE_CELLS,
    payload: amount
  };
}

export function reviveCell(id) {
  return {
    type: REVIVE_CELL,
    payload: id
  };
}
