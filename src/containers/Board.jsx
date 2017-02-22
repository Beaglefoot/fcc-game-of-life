import React from 'react';
import { connect } from 'react-redux';

import '../css/Board.scss';

class Board extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          {
            Array(this.props.height).fill(
              <tr>
                {Array(this.props.width).fill(<td>{' '}</td>)}
              </tr>
            )
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
