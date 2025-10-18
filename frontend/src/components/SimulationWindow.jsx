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
        return { color: theme.palette.simulation.type.explosive, icon: LocalFireDepartment };
      case 'פורמלית':
        return { color: theme.palette.simulation.type.formal, icon: MenuBook };
      default:
        return { color: theme.palette.text.disabled, icon: MenuBook };
    }
  };

  // Get difficulty color and icon
  const getDifficultyConfig = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'קלה':
        return { color: theme.palette.simulation.difficulty.easy, icon: CheckCircle };
      case 'בינונית':
        return { color: theme.palette.simulation.difficulty.medium, icon: Warning };
      case 'קשה':
        return { color: theme.palette.simulation.difficulty.hard, icon: Error };
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

          {/* Summary Section */}
          {simulation.summary && (
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
                תקציר הסימולציה
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                {simulation.summary}
              </Typography>
            </Box>
          )}

          <Divider />

          {/* Author Section - Only show if author is known */}
          {simulation.author && simulation.author !== 'מחבר לא ידוע' && (
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
                <Person sx={{ fontSize: { xs: 18, md: 26 } }} />
                מחבר הסימולציה
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' }, fontWeight: 'medium' }}>
                {simulation.author}
              </Typography>
            </Box>
          )}
          {/* Topics Section */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
              <Help sx={{ fontSize: { xs: 18, md: 26 } }} />
              נושאי הסימולציה
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {/* Simulation topics */}
                  {simulation.simulation_topics && simulation.simulation_topics.map((topic, index) => (
                    <SimulationWindowChip key={index} label={topic} />
                  ))}
                  {/* Show generic message if no topics */}
                  {(!simulation.simulation_topics || simulation.simulation_topics.length === 0) && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                      לסימולציה זו לא משוייכים נושאים
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Role Section */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
              <Person sx={{ fontSize: { xs: 18, md: 26 } }} />
              תפקיד רלוונטי
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {/* Single role */}
                  {simulation.role && (
                    <SimulationWindowChip label={simulation.role} />
                  )}
                  {/* Show generic message if no role */}
                  {!simulation.role && (
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
              שבוע מתאים
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {/* Single week */}
                  {simulation.week_topic && (
                    <SimulationWindowChip label={simulation.week_topic} />
                  )}
                  {/* Show generic message if no week */}
                  {!simulation.week_topic && (
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
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.4rem' }, fontWeight: 'bold' }}>
              <LinkIcon sx={{ fontSize: { xs: 18, md: 26 } }} />
              קבצים מצורפים
            </Typography>
            {simulation.url && simulation.url !== 'https://example.com/placeholder' ? (
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
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                לסימולציה זו אין קבצים מצורפים
              </Typography>
            )}
          </Box>
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
