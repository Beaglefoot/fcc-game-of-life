import React from 'react';
import { connect } from 'react-redux';

import { nextGeneration } from '../actions/generationActions';

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonText: 'Start',
      intervalId: 0
    };
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
      const intervalId = setInterval(() => {
        console.log('tick');
        this.props.nextGeneration();
      }, 1000);

      this.setState({ intervalId });
    }
  }

  render() {
    return (
      <button onClick={e => this.handleClick(e)}>{this.state.buttonText}</button>
    );
  }
}

export default connect(null, { nextGeneration })(Controls);