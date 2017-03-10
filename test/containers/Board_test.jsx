import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';

import reducer from '../../src/reducers/';
import Board from '../../src/containers/Board';

describe('<Board />', () => {
  const store = createStore(reducer);
  let item;

  beforeEach(() => {
    item = mount(
      <Provider store={store}>
        <Board />
      </Provider>
    );
  });

  it('should render', () => {
    expect(item.find('Board')).to.have.length(1);
  });

  it('should have cells from store', () => {
    const cellsInStore = store.getState().cells;
    const cellsOnPage = item.find('td');

    expect(cellsOnPage.length).to.equal(cellsInStore.length);
    expect(cellsOnPage.filter('.dead').length)
      .to.equal(cellsInStore.filter(cell => cell.age === 0).length);
  });

  it('should revive dead cell on click', () => {
    const firstDeadCell = item.find('td.dead').first();
    const id = firstDeadCell.prop('id');

    firstDeadCell.simulate('click');

    const cellInStore = store.getState().cells.find(cell => cell.id === id);

    expect(firstDeadCell.hasClass('dead')).to.be.false;
    expect(cellInStore).to.include({ age: 1 });
  });
});
