import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import cellsReducer from './cellsReducer';
import generationReducer from './generationReducer';

export default combineReducers({
  board: boardReducer,
  cells: cellsReducer,
  generation: generationReducer
});
