import React from 'react';

import '../css/Signature.scss';

export default class Signature extends React.Component {
  render() {
    return (
      <footer className="signature">by{' '}
        <a target="_blank" href="https://github.com/Beaglefoot">Beaglefoot</a>
      </footer>
    );
  }
}
