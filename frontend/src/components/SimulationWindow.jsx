import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SimulationWindowChip from './SimulationWindowChip';
import {
  Close,
  LocalFireDepartment,
  MenuBook,
  CheckCircle,
  Warning,
  Error,
  Help,
  Person,
  Link as LinkIcon,
  CalendarToday,
} from '@mui/icons-material';

function SimulationWindow({ open, onClose, simulation }) {
  const theme = useTheme();
  
  if (!simulation) return null;

  // Get type color and icon
  const getTypeConfig = (type) => {
    switch (type) {
      case 'מתפרצת':
        return { color: theme.palette.simulation.explosive, icon: LocalFireDepartment };
      case 'פורמלית':
        return { color: theme.palette.simulation.formal, icon: MenuBook };
      default:
        return { color: theme.palette.text.disabled, icon: MenuBook };
    }
  };

  // Get difficulty color and icon
  const getDifficultyConfig = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'קלה':
        return { color: theme.palette.simulation.easy, icon: CheckCircle };
      case 'בינונית':
        return { color: theme.palette.simulation.medium, icon: Warning };
      case 'קשה':
        return { color: theme.palette.simulation.hard, icon: Error };
      default:
        return { color: theme.palette.text.disabled, icon: CheckCircle };
    }
  };

  const typeConfig = getTypeConfig(simulation.type);
  const difficultyConfig = getDifficultyConfig(simulation.difficulty);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          width: '100%',
          margin: { xs: 1, sm: 2 },
          maxWidth: { xs: 'calc(100vw - 16px)', sm: '600px', md: '700px', lg: '800px' }
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1,
        px: 2,
        py: 1.5
      }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}>
          {simulation.title || 'סימולציה ללא כותרת'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 2, md: 3.5 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, md: 4 } }}>
          {/* Main Info Section */}
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {/* Type */}
            <Paper sx={{ 
              p: { xs: 2, md: 3 }, 
              flex: 1, 
              minWidth: 180,
              backgroundColor: `${typeConfig.color}10`,
              border: `1px solid ${typeConfig.color}30`
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <typeConfig.icon sx={{ color: typeConfig.color, fontSize: { xs: 20, md: 28 } }} />
                <Typography variant="subtitle2" sx={{ color: typeConfig.color, fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                  סוג הסימולציה
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: typeConfig.color, fontWeight: 'medium', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                {simulation.type || 'לא מוגדר'}
              </Typography>
            </Paper>

            {/* Difficulty */}
            <Paper sx={{ 
              p: { xs: 2, md: 3 }, 
              flex: 1, 
              minWidth: 180,
              backgroundColor: `${difficultyConfig.color}10`,
              border: `1px solid ${difficultyConfig.color}30`
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <difficultyConfig.icon sx={{ color: difficultyConfig.color, fontSize: { xs: 20, md: 28 } }} />
                <Typography variant="subtitle2" sx={{ color: difficultyConfig.color, fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                  רמת קושי
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: difficultyConfig.color, fontWeight: 'medium', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                {simulation.difficulty || 'לא מוגדר'}
              </Typography>
            </Paper>
          </Box>

          <Divider />

          {/* Topics Section */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
              <Help sx={{ fontSize: { xs: 18, md: 26 } }} />
              נושאי הסימולציה
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* All Topics Combined */}
              <Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {/* Main topic first */}
                  {simulation.main_sim_topic && (
                    <SimulationWindowChip label={simulation.main_sim_topic} />
                  )}
                  {/* Additional topics */}
                  {simulation.additional_sim_topics && simulation.additional_sim_topics.map((topic, index) => (
                    <SimulationWindowChip key={index} label={topic} />
                  ))}
                  {/* Show generic message if no topics */}
                  {!simulation.main_sim_topic && (!simulation.additional_sim_topics || simulation.additional_sim_topics.length === 0) && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                      לסימולציה זו לא משוייכים נושאים
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Roles Section */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
              <Person sx={{ fontSize: { xs: 18, md: 26 } }} />
              מסלולים ועיסוקים רלוונטיים
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* All Roles Combined */}
              <Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {/* Main role first */}
                  {simulation.main_role_tag && (
                    <SimulationWindowChip label={simulation.main_role_tag} />
                  )}
                  {/* Additional roles */}
                  {simulation.additional_role_tags && simulation.additional_role_tags.map((role, index) => (
                    <SimulationWindowChip key={index} label={role} />
                  ))}
                  {/* Show generic message if no roles */}
                  {!simulation.main_role_tag && (!simulation.additional_role_tags || simulation.additional_role_tags.length === 0) && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                      סימולציה זו מתאימה לכל תפקיד.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Week Information */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
              <CalendarToday sx={{ fontSize: { xs: 18, md: 26 } }} />
              שבועות מתאימים
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* All Weeks Combined */}
              <Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {/* Main week first */}
                  {simulation.main_week && (
                    <SimulationWindowChip label={simulation.main_week} />
                  )}
                  {/* Additional weeks */}
                  {simulation.additional_weeks && simulation.additional_weeks.map((week, index) => (
                    <SimulationWindowChip key={index} label={week} />
                  ))}
                  {/* Show generic message if no weeks */}
                  {!simulation.main_week && (!simulation.additional_weeks || simulation.additional_weeks.length === 0) && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                      סימולציה זו מתאימה לכל שבוע.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Link Section */}
          {simulation.url && (
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
                <LinkIcon sx={{ fontSize: { xs: 18, md: 26 } }} />
                קבצים מצורפים
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={simulation.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 'medium',
                  px: { xs: 1, md: 1 },
                  py: { xs: 0.5, md: 0.5 },
                  fontSize: { xs: '0.8rem', md: '1rem' },
                  minHeight: 'auto',
                  '& .MuiButton-startIcon': {
                    marginRight: { xs: 0.25, md: 0.5 }
                  }
                }}
              >
                מסמך אישור תוכניות
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, px: 2.5 }}>
        <Button onClick={onClose} variant="outlined" size="small" sx={{ 
          textTransform: 'none', 
          fontSize: { xs: '0.85rem', md: '1rem' },
          px: { xs: 2, md: 3 },
          py: { xs: 0.75, md: 1 }
        }}>
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SimulationWindow;
