import React, { Component } from 'react';
import { getOrigin } from 'interactive-stateful-process';

const App = () => {
  const o = getOrigin();

  return (
    <div>
      App is Up! {JSON.stringify(o)}
    </div>
  );
}

export default App;
