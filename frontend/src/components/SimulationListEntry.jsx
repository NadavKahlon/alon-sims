import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { LocalFireDepartment, MenuBook, CheckCircle, Warning, Error, Help, Person, CalendarToday } from '@mui/icons-material';

function SimulationListEntry({ simulation, onClick }) {

  const handleClick = useCallback(() => {
    onClick(simulation);
  }, [onClick, simulation]);

  // Get type color and icon
  const getTypeConfig = (type) => {
    switch (type) {
      case 'מתפרצת':
        return { color: '#ff9800', icon: LocalFireDepartment };
      case 'פורמלית':
        return { color: '#2196f3', icon: MenuBook };
      default:
        return { color: '#2196f3', icon: MenuBook };
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
      onClick={handleClick}
      sx={{ 
        p: { xs: 1.5, md: 3 }, 
        mb: { xs: 1.5, md: 2.5 }, 
        borderRadius: { xs: 1.5, md: 2 },
        display: 'flex',
        alignItems: 'stretch',
        gap: { xs: 1.5, md: 3 },
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        minHeight: { xs: 80, md: 140 },
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
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: { xs: 0.5, md: 1 }, 
        minWidth: { xs: 45, md: 160 },
        width: { xs: 45, md: 160 },
        order: 2,
        justifyContent: 'stretch'
      }}>
        {/* Type slot */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, md: 1 },
          p: { xs: 0.5, md: 1.5 },
          borderRadius: { xs: 0.5, md: 1 },
          backgroundColor: `${typeConfig.color}20`,
          border: `1px solid ${typeConfig.color}40`,
          flex: 1,
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          <typeConfig.icon sx={{ color: typeConfig.color, fontSize: { xs: 14, md: 24 } }} />
          <Typography variant="caption" sx={{ 
            color: typeConfig.color, 
            fontWeight: 'bold', 
            fontSize: { xs: '0.6rem', md: '0.9rem' }, 
            textAlign: 'center' 
          }}>
            {simulation.type || 'סוג'}
          </Typography>
        </Box>

        {/* Difficulty slot */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, md: 1 },
          p: { xs: 0.5, md: 1.5 },
          borderRadius: { xs: 0.5, md: 1 },
          backgroundColor: `${difficultyConfig.color}20`,
          border: `1px solid ${difficultyConfig.color}40`,
          flex: 1,
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          <difficultyConfig.icon sx={{ color: difficultyConfig.color, fontSize: { xs: 14, md: 24 } }} />
          <Typography variant="caption" sx={{ 
            color: difficultyConfig.color, 
            fontWeight: 'bold', 
            fontSize: { xs: '0.6rem', md: '0.9rem' }, 
            textAlign: 'center' 
          }}>
            {simulation.difficulty || 'רמה'}
          </Typography>
        </Box>
      </Box>

      {/* Left side - Content (RTL) */}
      <Box sx={{ flex: 1, order: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="subtitle1" component="h3" sx={{ 
          fontSize: { xs: '1rem', md: '1.4rem' }, 
          fontWeight: 600, 
          mb: { xs: 0.75, md: 1.5 } 
        }}>
          {simulation.title || 'סימולציה ללא כותרת'}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: { xs: 0.75, md: 1.5 }, flexWrap: 'wrap' }}>
          <Box sx={{ 
            backgroundColor: 'grey.200', 
            color: 'grey.700',
            px: { xs: 0.75, md: 1.5 },
            py: { xs: 0.25, md: 0.75 },
            borderRadius: { xs: 0.75, md: 1.5 },
            fontSize: { xs: '0.65rem', md: '0.85rem' },
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.25, md: 0.5 }
          }}>
            <Help sx={{ fontSize: { xs: 12, md: 16 } }} />
            {simulation.main_sim_topic || 'נושא ראשי'}
          </Box>
          
          {simulation.main_role_tag && (
            <Box sx={{ 
              backgroundColor: 'grey.200', 
              color: 'grey.700',
              px: { xs: 0.75, md: 1.5 },
              py: { xs: 0.25, md: 0.75 },
              borderRadius: { xs: 0.75, md: 1.5 },
              fontSize: { xs: '0.65rem', md: '0.85rem' },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.25, md: 0.5 }
            }}>
              <Person sx={{ fontSize: { xs: 12, md: 16 } }} />
              {simulation.main_role_tag}
            </Box>
          )}

          {simulation.main_week && (
            <Box sx={{ 
              backgroundColor: 'grey.200', 
              color: 'grey.700',
              px: { xs: 0.75, md: 1.5 },
              py: { xs: 0.25, md: 0.75 },
              borderRadius: { xs: 0.75, md: 1.5 },
              fontSize: { xs: '0.65rem', md: '0.85rem' },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.25, md: 0.5 }
            }}>
              <CalendarToday sx={{ fontSize: { xs: 12, md: 16 } }} />
              {simulation.main_week}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default SimulationListEntry;
