import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import combinedReducer from './reducers';
import App from './components/App';
import { initializeCells, reviveCell } from './actions/cellsActions';
import './css/style.scss';

const store = createStore(combinedReducer);

const getCellsAmount = ({ width, height }) => width * height;

store.dispatch(
  initializeCells(getCellsAmount(store.getState().board))
);

store.dispatch(reviveCell(2));
console.log(store.getState().cells);

const render = Component => (
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.querySelector('.container')
  )
);

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
