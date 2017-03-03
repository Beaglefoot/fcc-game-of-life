export const REVIVE_CELL = 'REVIVE_CELL';

export function reviveCell(id) {
  return {
    type: REVIVE_CELL,
    id
  };
}
