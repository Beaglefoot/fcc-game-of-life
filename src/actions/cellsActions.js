export const INITIALIZE_CELLS = 'INITIALIZE_CELLS';

export function initializeCells(amount) {
  return {
    type: INITIALIZE_CELLS,
    payload: new Array(amount)
    .fill({ status: 'dead' })
    .map((cell, index) => ({ ...cell, id: index }))
  };
}
