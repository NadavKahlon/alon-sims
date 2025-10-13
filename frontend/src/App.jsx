import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import SearchTab from './components/SearchTab';

// Create RTL theme
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Arial',
      'Helvetica',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SearchTab />
      </div>
    </ThemeProvider>
  );
}

export default App;
