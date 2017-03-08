import React from 'react';
import { connect } from 'react-redux';

import { randomizeCells } from '../actions/cellsActions';
import { nextGeneration, resetGeneration } from '../actions/generationActions';

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonText: 'Start',
      intervalId: 0
    };

    this.nextGeneration = this.props.nextGeneration.bind(this);
    this.resetGeneration = this.props.resetGeneration.bind(this);
    this.randomizeCells = this.props.randomizeCells.bind(this);
  }

  toggleButtonText() {
    this.setState({
      buttonText: this.state.buttonText === 'Start' ? 'Stop' : 'Start'
    });
  }

  handleClick() {
    this.toggleButtonText();

    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: 0 });
    }
    else {
      const intervalId = setInterval(this.nextGeneration, 700);
      this.setState({ intervalId });
    }
  }

  render() {
    return (
      <div>
        <button onClick={e => this.handleClick(e)}>
          {this.state.buttonText}
        </button>
        <button onClick={this.nextGeneration}>nextStep</button>
        <button onClick={this.resetGeneration}>Clear</button>
        <button onClick={this.randomizeCells}>Randomize</button>
        <div>Generation: {this.props.generation}</div>
      </div>
    );
  }
}

function mapStateToProps({ generation }) {
  return { generation };
}

export default connect(
  mapStateToProps,
  { nextGeneration, resetGeneration, randomizeCells }
)(Controls);
