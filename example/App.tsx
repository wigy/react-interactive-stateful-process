import React, { Component } from 'react';
import { getOrigin } from 'interactive-stateful-process';
import Foo from 'react-interactive-stateful-process';

const App = () => {
  const o = getOrigin();

  return (
    <div>
      App is Up!
      <br />
      {JSON.stringify(Foo)}
    </div>
  );
}

export default App;
