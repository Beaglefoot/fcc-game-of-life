import React from 'react';
import { connect } from 'react-redux';

import { reviveCell } from '../actions/cellsActions';
import '../css/Board.scss';

class Board extends React.Component {
  handleClick(event) {
    this.props.reviveCell(
      parseInt(event.target.getAttribute('id'))
    );

    event.target.classList.add('alive');
  }

  assignCellClass(id) {
    const age = this.props.cells.find(cell => cell.id === id).age;

    if (age === 0) return 'dead';
    if (age === 1) return 'young';
    else return 'mature';
  }

  render() {
    let counter = 0;

    return (
      <table onClick={e => this.handleClick(e)}>
        <tbody>
          {
            new Array(this.props.board.rows).fill().map((_, index) => (
              <tr key={index}>
                {
                  new Array(this.props.board.columns).fill().map(() => (
                    <td
                      className={this.assignCellClass(counter)}
                      key={counter}
                      id={counter++}
                    >
                      {' '}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ board, cells }) {
  return { board, cells };
}

export default connect(mapStateToProps, { reviveCell })(Board);
