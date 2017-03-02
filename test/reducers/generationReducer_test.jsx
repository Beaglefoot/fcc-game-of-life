/*eslint no-unused-vars: off*/
import { expect } from 'chai';
import reducer from '../../src/reducers/generationReducer';
import { NEXT_GENERATION } from '../../src/actions/generationActions';

describe('generationReducer', () => {
  it('should equal zero by default', () => {
    expect(reducer()).to.deep.equal({ generation: 0 });
  });

  it('should increment generation count on next generation', () => {
    const initialState = reducer();
    const finalState = reducer(initialState, { type: NEXT_GENERATION });

    expect(finalState.generation - initialState.generation).to.equal(1);
  });
});
