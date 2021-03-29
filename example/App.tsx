import React from 'react';
import { getOrigin } from 'interactive-stateful-process';
import Foo from '../src/index';

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
