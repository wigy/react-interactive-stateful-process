import React from 'react';
import { Paper } from '@material-ui/core'

const App = () => {

  return (
    <Paper style={{ padding: '1rem' }} elevation={4}>
      App is Up!
      <br />
      {JSON.stringify("HELLO")}
    </Paper>
  );
}

export default App;
