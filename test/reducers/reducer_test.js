/*eslint no-unused-vars: off*/
import { expect } from 'chai';
import reducer, { generateCells } from '../../src/reducers';
import { REVIVE_CELL } from '../../src/actions/cellsActions';
import { NEXT_GENERATION } from '../../src/actions/generationActions';

describe('reducer', () => {
  it('should have default state', () => {
    const state = reducer();

    expect(state).to.contain.all.keys('board', 'cells', 'generation');
    expect(state.cells).to.have.length.above(100);
  });

  it('should create custom state', () => {
    const rows = 8;
    const columns = 8;
    const initialState = {
      board: { rows, columns },
      cells: generateCells(rows * columns),
      generation: 0
    };

    expect(reducer(initialState)).to.equal(initialState);
  });


  // Create state automatically for the rest of tests
  let initialState = {};

  beforeEach(() => {
    const rows = 8;
    const columns = 8;
    initialState = {
      board: { rows, columns },
      cells: generateCells(rows * columns),
      generation: 0
    };
  });


  it('should revive cell with given id', () => {
    const finalState = reducer(initialState, { type: REVIVE_CELL, id: 1 });

    expect(finalState.cells).to.have.lengthOf(initialState.cells.length);
    expect(finalState.cells).to.include({ id: 1, age: 1 });
  });

  it('should increment generation count on next generation', () => {
    const finalState = reducer(initialState, { type: NEXT_GENERATION });

    expect(finalState.generation - initialState.generation).to.equal(1);
  });
});
