import React from 'react';
import { Paper } from '@material-ui/core'
import { RISP } from '../src/RISP';

const App = () => {

  const setup = {
  }

  const values = {
    a: '999',
    b: ''
  }

  const element = {
    type: 'flat',
    elements: [
      {
        type: 'text',
        actions: {},
        label: 'First value',
        name: 'a',
        value: ''
      },
      {
        type: 'text',
        actions: {},
        label: 'Second value',
        name: 'b',
        value: ''
      }
    ]
  }

  return (
    <Paper style={{ padding: '1rem' }} elevation={4}>
      App is Up!
      <br />
      <RISP element={element} values={values} setup={setup}/>
    </Paper>
  );
}

export default App;
