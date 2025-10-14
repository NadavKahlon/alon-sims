import { createTheme } from '@mui/material/styles';

// Create RTL theme with custom green oak tree leaf color palette
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Arial',
      'Helvetica',
      'sans-serif',
    ].join(','),
  },
  palette: {
    // Primary colors based on logo (#476847 background, #EEECDE text)
    primary: {
      main: '#476847',        // Logo background color
      light: '#5a7a5a',       // Lighter shade of logo color
      dark: '#3a5a3a',        // Darker shade of logo color
      contrastText: '#EEECDE', // Logo text color
    },
    secondary: {
      main: '#8a9a8a',        // Complementary sage green
      light: '#a8b8a8',       // Light sage green
      dark: '#6a7a6a',        // Dark sage green
      contrastText: '#EEECDE', // Logo text color
    },
    // Background colors
    background: {
      default: '#f5f5f0',     // Very light cream (complementary to logo)
      paper: '#ffffff',
    },
    // Text colors
    text: {
      primary: '#2c3e2c',     // Logo background color for primary text
      secondary: '#6a7a6a',   // Dark sage green for secondary text
      disabled: '#a8b8a8',    // Light sage green for disabled text
    },
    // Action colors
    action: {
      active: '#476847',      // Logo background color
      hover: '#47684720',     // Logo color with transparency
      selected: '#47684730',  // Logo color with transparency
      disabled: '#a8b8a8',    // Light sage green
    },
    // Custom semantic colors for the application
    simulation: {
      // Simulation type colors
      type: {
        explosive: '#ff9800',  // Orange for מתפרצת
        formal: '#2196f3',     // Blue for פורמלית
      },
      
      // Difficulty colors
      difficulty: {
        easy: '#4caf50',        // Green for קלה
        medium: '#ffc107',      // Yellow for בינונית
        hard: '#f44336',        // Red for קשה
      },
      
    }
  },
});

export default theme;
