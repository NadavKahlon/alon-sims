import React from 'react';
import { Chip } from '@mui/material';

function SimulationWindowChip({ label, variant = "outlined", size = "small" }) {
  return (
    <Chip 
      label={label} 
      variant={variant}
      size={size}
      sx={{ 
        fontSize: { xs: '0.8rem', md: '1rem' },
        padding: { xs: '1px 2px', md: '4px 8px' },
        minHeight: { xs: '24px', md: '32px' }
      }}
    />
  );
}

export default SimulationWindowChip;
