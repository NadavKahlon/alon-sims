import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { LocalFireDepartment, MenuBook, CheckCircle, Warning, Error, Help, Person } from '@mui/icons-material';

function SimulationListEntry({ simulation, onClick }) {

  // Get type color and icon
  const getTypeConfig = (type) => {
    switch (type) {
      case 'מתפרצת':
        return { color: '#ff9800', icon: LocalFireDepartment };
      case 'פורמלית':
        return { color: '#2196f3', icon: MenuBook };
      default:
        return { color: '#9e9e9e', icon: MenuBook };
    }
  };

  // Get difficulty color and icon
  const getDifficultyConfig = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'קלה':
        return { color: '#4caf50', icon: CheckCircle };
      case 'בינונית':
        return { color: '#ffc107', icon: Warning };
      case 'קשה':
        return { color: '#f44336', icon: Error };
      default:
        return { color: '#9e9e9e', icon: CheckCircle };
    }
  };  

  const typeConfig = getTypeConfig(simulation.type);
  const difficultyConfig = getDifficultyConfig(simulation.difficulty);

  return (
    <Paper 
      elevation={2} 
      onClick={onClick}
      sx={{ 
        p: 2, 
        mb: 2, 
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          elevation: 6,
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          backgroundColor: 'rgba(0,0,0,0.02)'
        },
        '&:active': {
          transform: 'translateY(0px)',
          elevation: 2
        }
      }}
    >
      {/* Right side - Type and Difficulty slots (RTL) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 80, order: 2 }}>
        {/* Type slot */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          p: 1,
          borderRadius: 1,
          backgroundColor: `${typeConfig.color}20`,
          border: `1px solid ${typeConfig.color}40`
        }}>
          <typeConfig.icon sx={{ color: typeConfig.color, fontSize: 20 }} />
          <Typography variant="caption" sx={{ color: typeConfig.color, fontWeight: 'bold' }}>
            {simulation.type || 'סוג'}
          </Typography>
        </Box>

        {/* Difficulty slot */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          p: 1,
          borderRadius: 1,
          backgroundColor: `${difficultyConfig.color}20`,
          border: `1px solid ${difficultyConfig.color}40`
        }}>
          <difficultyConfig.icon sx={{ color: difficultyConfig.color, fontSize: 20 }} />
          <Typography variant="caption" sx={{ color: difficultyConfig.color, fontWeight: 'bold' }}>
            {simulation.difficulty || 'רמה'}
          </Typography>
        </Box>
      </Box>

      {/* Left side - Content (RTL) */}
      <Box sx={{ flex: 1, order: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {simulation.title || 'סימולציה ללא כותרת'}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
          <Box sx={{ 
            backgroundColor: 'grey.200', 
            color: 'grey.700',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
            <Help sx={{ fontSize: 16 }} />
            {simulation.main_sim_topic || 'נושא ראשי'}
          </Box>
          
          <Box sx={{ 
            backgroundColor: 'grey.200', 
            color: 'grey.700',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
            <Person sx={{ fontSize: 16 }} />
            {simulation.main_role_tag || 'כללי'}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default SimulationListEntry;
