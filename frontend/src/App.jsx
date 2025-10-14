import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import stylisPluginRtl from 'stylis-plugin-rtl';
import SearchTab from './components/SearchTab';
import theme from './theme';

// Emotion cache with RTL transformer
const rtlCache = createCache({ key: 'muirtl', stylisPlugins: [stylisPluginRtl] });

function App() {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" dir="rtl">
          <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                ארכיון סימולציות אלון
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <SearchTab />
          </Box>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
