import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import cellsReducer from './cellsReducer';

export default combineReducers({
  board: boardReducer,
  cells: cellsReducer
});
