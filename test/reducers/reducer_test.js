/*eslint no-unused-vars: off*/
import { expect } from 'chai';
import reducer, { generateCells, getAllNeighborCells } from '../../src/reducers';
import { REVIVE_CELL } from '../../src/actions/cellsActions';
import { NEXT_GENERATION } from '../../src/actions/generationActions';

describe('reducer', () => {
  it('should have default state', () => {
    const state = reducer();

    expect(state).to.contain.all.keys('board', 'cells', 'generation');
    expect(state.cells).to.have.length.above(0);
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

  // it('should revive cells if conditions are appropriate', () => {
  //   const someCellsAlive = [0, 1, 2]
  //     .map(id => ({ id, age: 1 }))
  //     .concat(initialState.cells.slice(3));
  //
  //   const newInitialState = { ...initialState, cells: someCellsAlive };
  //   const finalState = reducer(newInitialState, NEXT_GENERATION);
  //
  //   expect(finalState.cells.find(cell => cell.id === 9).age).to.equal(1);
  // });
});

describe('getAllNeighborCells helper function', () => {
  let state = {};

  beforeEach(() => {
    const rows = 8;
    const columns = 8;
    state = {
      board: { rows, columns },
      cells: generateCells(rows * columns),
      generation: 0
    };
  });

  it('should return all neighbors for a cell in the middle of a board', () => {
    const result = getAllNeighborCells(state, 9);

    expect(result).to.have.length(8);
    expect(result).to.contain(
      { id: 0, age: 0 },
      { id: 1, age: 0 },
      { id: 2, age: 0 },
      { id: 8, age: 0 },
      { id: 10, age: 0 },
      { id: 16, age: 0 },
      { id: 17, age: 0 },
      { id: 18, age: 0 }
    );
  });

  it('should return all neighbors for a cell at the border', () => {
    const result = getAllNeighborCells(state, 7);

    expect(result).to.have.length(8);
    expect(result).to.contain(
      { id: 6, age: 0 },
      { id: 15, age: 0 },
      { id: 14, age: 0 },
      { id: 63, age: 0 },
      { id: 62, age: 0 },
      { id: 0, age: 0 },
      { id: 8, age: 0 },
      { id: 56, age: 0 }
    );
  });
});
