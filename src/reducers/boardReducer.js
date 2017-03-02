/*eslint indent: off*/
import defaultBoard from '../defaultBoard';

export default function(state = defaultBoard, action) {
  if (!action) return state;

  switch(action.type) {
    default: return state;
  }
}
