export const NEXT_GENERATION = 'NEXT_GENERATION';
export const RESET_GENERATION = 'RESET_GENERATION';
export const PREVIOUS_GENERATION = 'PREVIOUS_GENERATION';

export function nextGeneration() {
  return { type: NEXT_GENERATION };
}

export function resetGeneration() {
  return { type: RESET_GENERATION };
}

export function previousGeneration() {
  return { type: PREVIOUS_GENERATION };
}
