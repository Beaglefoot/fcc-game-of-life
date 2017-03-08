import React from 'react';
import { connect } from 'react-redux';

import { randomizeCells } from '../actions/cellsActions';
import { nextGeneration, resetGeneration, previousGeneration } from '../actions/generationActions';

import '../css/Controls.scss';

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonText: 'Start',
      intervalId: 0
    };

    this.previousGeneration = this.props.previousGeneration.bind(this);
    this.nextGeneration = this.props.nextGeneration.bind(this);
    this.resetGeneration = this.props.resetGeneration.bind(this);
    this.randomizeCells = this.props.randomizeCells.bind(this);
  }

  toggleButtonText() {
    this.setState({
      buttonText: this.state.buttonText === 'Start' ? 'Stop' : 'Start'
    });
  }

  checkAliveCells() {
    return this.props.cells.some(cell => cell.age > 0);
  }

  handleClick() {
    this.toggleButtonText();

    const stopGame = () => {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: 0 });
    };

    if (this.state.intervalId) stopGame();
    else {
      const intervalId = setInterval(() => {
        if (this.checkAliveCells()) this.nextGeneration();
        else {
          stopGame();
          this.toggleButtonText();
        }
      }, 200);
      this.setState({ intervalId });
    }
  }

  render() {
    return (
      <div className="controls">
        <button onClick={e => this.handleClick(e)}>
          {this.state.buttonText}
        </button>
        <button onClick={this.previousGeneration}>Prev Step</button>
        <button onClick={this.nextGeneration}>Next Step</button>
        <button onClick={this.resetGeneration}>Clear</button>
        <button onClick={this.randomizeCells}>Randomize</button>
        <div className="counter">Generation: {this.props.generation}</div>
      </div>
    );
  }
}

function mapStateToProps({ generation, cells }) {
  return { generation, cells };
}

export default connect(
  mapStateToProps,
  { nextGeneration, resetGeneration, randomizeCells, previousGeneration }
)(Controls);
