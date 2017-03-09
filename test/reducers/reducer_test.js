/*eslint no-unused-vars: off*/
import { expect } from 'chai';
import reducer,
  {
    generateCells,
    getAllNeighborCellIds,
    countAliveCells,
    calcNewGeneration,
    reviveCell,
  } from '../../src/reducers';
import { REVIVE_CELL, RANDOMIZE_CELLS } from '../../src/actions/cellsActions';
import { NEXT_GENERATION, PREVIOUS_GENERATION } from '../../src/actions/generationActions';

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
      generation: 0,
      history: []
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

  it('should revive cells if conditions are appropriate', () => {
    const someCellsAlive = [0, 1, 2]
      .map(id => ({ id, age: 1 }))
      .concat(initialState.cells.slice(3));

    const newInitialState = { ...initialState, cells: someCellsAlive };
    const finalState = reducer(newInitialState, { type: NEXT_GENERATION });

    expect(finalState.cells.find(cell => cell.id === 9).age).to.equal(1);
  });

  it('should kill a cell in case of isolation', () => {
    const cellsSingleAlive = [{ id: 0, age: 1 }]
      .concat(initialState.cells.slice(1));

    const finalState = reducer(
      { ...initialState, cells: cellsSingleAlive },
      { type: NEXT_GENERATION }
    );

    expect(finalState.cells.find(cell => cell.id === 0).age).to.equal(0);
  });

  it('should kill a cell in case of overcrowding', () => {
    const cellsFiveNeighbors = [0, 1, 2, 9, 10]
      .reduce((cells, id) => reviveCell(cells, id), initialState.cells);

    const finalState = reducer(
      { ...initialState, cells: cellsFiveNeighbors },
      { type: NEXT_GENERATION }
    );

    expect(finalState.cells.find(cell => cell.id === 9).age).to.equal(0);
  });

  it('should create random cells on board', () => {
    const finalState = reducer(initialState, { type: RANDOMIZE_CELLS });

    expect(finalState.cells).to.have.length(initialState.cells.length);
    expect(finalState).to.not.deep.equal(initialState);
  });

  it('should create history for previous generation', () => {
    const someCellsAlive = [0, 1, 2]
      .map(id => ({ id, age: 1 }))
      .concat(initialState.cells.slice(3));

    const newInitialState = { ...initialState, cells: someCellsAlive };
    const finalState = reducer(newInitialState, { type: NEXT_GENERATION });

    expect(finalState).to.include.key('history');

    const { history } = finalState;

    expect(history).to.be.an.array;
    expect(history).to.have.length(1);
    expect(history[0]).to.deep.equal({
      cells: newInitialState.cells,
      generation: newInitialState.generation
    });
  });

  it('should replace current state from history', () => {
    const someCellsAlive = [0, 1, 2]
      .map(id => ({ id, age: 1 }))
      .concat(initialState.cells.slice(3));

    const newInitialState = { ...initialState, cells: someCellsAlive };
    const firstStepState = reducer(newInitialState, { type: NEXT_GENERATION });

    expect(firstStepState.history).to.have.length(1);

    const secondStepState = reducer(firstStepState, { type: PREVIOUS_GENERATION });

    expect(secondStepState).to.include.keys('board', 'cells', 'generation', 'history');

    const { cells, generation, history } = secondStepState;

    expect(history).to.have.length(0);
    expect(generation).to.equal(firstStepState.history[0].generation);
    expect(cells).to.deep.equal(firstStepState.history[0].cells);
  });
});



describe('Helper Functions', () => {
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

  describe('getAllNeighborCellIds', () => {

    it('should return all neighbor IDs for a cell in the middle of a board', () => {
      const result = getAllNeighborCellIds(state, 9);

      expect(result).to.have.length(8);
      expect(result).to.contain(0, 1, 2, 8, 10, 16, 17, 18);
    });

    it('should return all neighbors for a cell at the border', () => {
      const result = getAllNeighborCellIds(state, 7);

      expect(result).to.have.length(8);
      expect(result).to.contain(6, 15, 14, 63, 62, 0, 8, 56);
    });

    it('should return all neighbors for a cell#8', () => {
      const result = getAllNeighborCellIds(state, 8);

      expect(result).to.have.length(8);
      expect(result).to.contain(0, 1, 7, 9, 16, 17, 15, 23);
    });
  });

  describe('countAliveCells', () => {
    it('should return correct amount of alive cells', () => {
      state.cells
        .forEach(cell => {
          if ([0,1,2,10].includes(cell.id)) cell.age = 1;
        });

      expect(countAliveCells(state, 9)).to.equal(4);
    });
  });

  describe('calcNewGeneration', () => {
    it('should return new cells state which contains revived cells', () => {
      state.cells = [0, 1, 2]
        .map(id => ({ id, age: 1 }))
        .concat(state.cells.slice(3));

      const newCellsState = calcNewGeneration(state);
      const revivedCells = newCellsState.filter(cell => cell.age > 0);

      expect(newCellsState).to.be.an('array');
      expect(revivedCells).to.have.length(3);
      expect(revivedCells).to.contain({ id: 9, age: 1}, { id: 57, age: 1});
    });

    it('should revive cell#8', () => {
      const cells = state.cells.map(cell => (
        [1, 9, 17].includes(cell.id) ? { ...cell, age: 1 } : cell
      ));
      state = { ...state, cells };

      expect(getAllNeighborCellIds(state, 8)).to.have.length(8);
      expect(countAliveCells(state, 8)).to.equal(3);

      const newCellsState = calcNewGeneration(state);
      const revivedCells = newCellsState.filter(cell => cell.age > 0);

      expect(revivedCells).to.contain({ id: 8, age: 1 });
    });

    it('should kill cells in case of isolation', () => {
      state.cells[1] = { id: 1, age: 1 };
      expect(calcNewGeneration(state)).to.contain({ id: 1, age: 0 });
    });

    it('should kill cells in case of overcrowding', () => {
      [0, 1, 2, 9, 10].forEach(id => state.cells[id] = { id, age: 1 });

      expect(
        calcNewGeneration(state).find(cell => cell.id === 9)
      ).to.deep.equal({ id: 9, age: 0 });
    });
  });
});
