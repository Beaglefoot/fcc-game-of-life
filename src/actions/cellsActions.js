export const REVIVE_CELL = 'REVIVE_CELL';
export const RANDOMIZE_CELLS = 'RANDOMIZE_CELLS';

export function reviveCell(id) {
  return {
    type: REVIVE_CELL,
    id
  };
}

export function randomizeCells() {
  return { type: RANDOMIZE_CELLS };
}
