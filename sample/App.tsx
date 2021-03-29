import React, { Component } from 'react';
import { getOrigin } from 'interactive-stateful-process';

class App extends Component {
  render() {
    const o = getOrigin();

    return (
      <div>
        App is Up! {JSON.stringify(o)}
      </div>
    );
  }
}

export default App;
