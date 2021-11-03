import { ThemeProvider } from '@material-ui/core';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import theme from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}><App /></ThemeProvider>,
  document.getElementById('root')
);

module && module.hot && module.hot.accept();
