import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Box } from '@mui/material';
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
            <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
              {/* Logo only */}
              <Box 
                component="img"
                src="/logo.png" 
                alt="Logo" 
                sx={{ 
                  height: { xs: 50, sm: 55, md: 80, lg: 90 },
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
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
