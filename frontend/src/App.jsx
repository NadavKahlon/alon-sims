import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import stylisPluginRtl from 'stylis-plugin-rtl';
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

// Emotion cache with RTL transformer
const rtlCache = createCache({ key: 'muirtl', stylisPlugins: [stylisPluginRtl] });

function App() {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" dir="rtl">
          <SearchTab />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
