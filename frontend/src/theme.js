import { createTheme } from '@mui/material/styles';

// Create RTL theme with custom color palette
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
