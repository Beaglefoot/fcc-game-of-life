/*eslint indent: off*/
import { INITIALIZE_CELLS } from '../actions/cellsActions';

export default function(state = {}, action) {
  const { type, payload } = action;

  switch(type) {
    case INITIALIZE_CELLS:
      return payload;
    default:
      return state;
  }
}
