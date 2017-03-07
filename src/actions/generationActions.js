export const NEXT_GENERATION = 'NEXT_GENERATION';
export const RESET_GENERATION = 'RESET_GENERATION';

export function nextGeneration() {
  return { type: NEXT_GENERATION };
}

export function resetGeneration() {
  return { type: RESET_GENERATION };
}
