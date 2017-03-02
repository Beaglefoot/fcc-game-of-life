/*eslint no-unused-vars: off*/
import { expect } from 'chai';
import reducer from '../../src/reducers/cellsReducer';
import { INITIALIZE_CELLS, REVIVE_CELL } from '../../src/actions/cellsActions';

describe('cellsReducer', () => {
  it('should initialize state', () => {
    const action = { type: INITIALIZE_CELLS, payload: 5 };
    const finalState = reducer({}, action);

    expect(finalState).to.deep.equal(
      [ { id: 0, age: 0 },
        { id: 1, age: 0 },
        { id: 2, age: 0 },
        { id: 3, age: 0 },
        { id: 4, age: 0 } ]
    );
  });

  it('should revive cell with given id', () => {
    const initialState = reducer({}, { type: INITIALIZE_CELLS, payload: 2 });
    const finalState = reducer(initialState, { type: REVIVE_CELL, payload: 1 });

    expect(finalState).to.have.lengthOf(2);
    expect(finalState).to.include({ id: 1, age: 1 });
  });
});
