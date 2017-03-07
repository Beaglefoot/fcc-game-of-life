import React from 'react';

import Board from '../containers/Board';
import Controls from '../containers/Controls';

export default function App() {
  return (
    <div>
      <h1>Game of Life with React and Redux</h1>
      <Board />
      <Controls />
    </div>
  );
}
