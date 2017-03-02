/*eslint indent: off*/
import { NEXT_GENERATION } from '../actions/generationActions';

export default function(state = { generation: 0 }, action) {
  if (!action) return state;

  switch(action.type) {
    case NEXT_GENERATION:
      return { generation: state.generation + 1 };
    default:
      return state;
  }
}
