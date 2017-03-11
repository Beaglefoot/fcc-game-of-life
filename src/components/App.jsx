import React from 'react';

import Board from '../containers/Board';
import Controls from '../containers/Controls';
import Signature from './Signature';

export default function App() {
  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <h3>with React and Redux</h3>
      <Board />
      <Controls />
      <Signature />
    </div>
  );
}
