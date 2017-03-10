/* eslint no-unused-vars: off */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';

import reducer from '../../src/reducers/';
import Controls from '../../src/containers/Controls';

describe('<Controls />', () => {
  let store = {};
  let item;

  beforeEach(() => {
    store = createStore(reducer);
    item = mount(
      <Provider store={store}>
        <Controls />
      </Provider>
    );
  });

  it('should render', () => {
    expect(item.find('Controls')).to.have.length(1);
  });

  describe.skip('Start button', () => {
    it('should render', () => {
      expect(item.find('button.start')).to.have.length(1);
    });

    it('should change text on button press', () => {
      const startButton = item.find('button.start').first();
      const initialText = startButton.text();

      startButton.simulate('click');

      expect(startButton.text()).to.not.equal(initialText);

      // Stop game
      startButton.simulate('click');
    });

    it('should start game on button press', (done) => {
      const startButton = item.find('button.start').first();
      const initialGenerationCounter = store.getState().generation;

      startButton.simulate('click');

      setTimeout(() => {
        expect(store.getState().generation).to.be.above(initialGenerationCounter);

        // Stop game
        startButton.simulate('click');
        done();
      }, 1000);
    });
  });

  describe('Next button', () => {
    it('should render', () => {
      expect(item.find('button.next')).to.have.length(1);
    });

    it('should change state on pressing button', () => {
      const nextButton = item.find('button.next').first();
      nextButton.simulate('click');

      const generationCounter = store.getState().generation;
      expect(generationCounter).to.equal(1);
    });
  });

  describe('Prev button', () => {
    it('should render', () => {
      expect(item.find('button.prev')).to.have.length(1);
    });

    it('should change state one step back on pressing button', () => {
      const nextButton = item.find('button.next').first();

      nextButton.simulate('click');

      const initialGenerationCounter = store.getState().generation;
      const prevButton = item.find('button.prev').first();

      prevButton.simulate('click');

      expect(initialGenerationCounter - store.getState().generation).to.equal(1);
    });
  });

  describe('Clear button', () => {
    it('should render', () => {
      expect(item.find('button.clear')).to.have.length(1);
    });

    it('should clear state on click', () => {
      const clearButton = item.find('button.clear').first();
      const initialAliveCellsCounter = store.getState()
        .cells.filter(cell => cell.age > 0).length;

      expect(initialAliveCellsCounter).to.be.above(0);

      clearButton.simulate('click');

      const finalAliveCellsCounter = store.getState()
        .cells.filter(cell => cell.age > 0).length;

      expect(finalAliveCellsCounter).to.equal(0);
    });
  });

  describe('Randomize button', () => {
    it('should render', () => {
      expect(item.find('button.randomize')).to.have.length(1);
    });

    it('should create different state on click', () => {
      const randomizeButton = item.find('button.randomize').first();
      const initialState = store.getState();

      randomizeButton.simulate('click');

      expect(store.getState()).to.not.deep.equal(initialState);
    });
  });

  describe('Counter', () => {
    it('should render', () => {
      expect(item.find('.counter')).to.have.length(1);
    });

    it('should have the same number as state', () => {
      const counter = item.find('.counter').first();
      const nextButton = item.find('button.next').first();

      nextButton.simulate('click');

      expect(counter.text()).to.include(store.getState().generation);
    });
  });
});
