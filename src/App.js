import React from 'react';
import './styles/App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import {createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Routers from './Router';

const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routers />
      </Router>
    </ThemeProvider>
  );
}

export default App;