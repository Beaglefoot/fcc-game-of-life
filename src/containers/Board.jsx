import React from 'react';
import { connect } from 'react-redux';

import '../css/Board.scss';

class Board extends React.Component {
  render() {
    let counter = 0;

    return (
      <table>
        <tbody>
          {
            new Array(this.props.rows).fill().map((_, index) => (
              <tr key={index}>
                {
                  new Array(this.props.columns).fill().map(() => (
                    <td key={counter} id={counter++}>{' '}</td>
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

function mapStateToProps({ board }) {
  return { ...board };
}

export default connect(mapStateToProps)(Board);
