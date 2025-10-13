import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper
} from '@mui/material';
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
  School
} from '@mui/icons-material';

function SimulationWindow({ open, onClose, simulation }) {
  if (!simulation) return null;

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          {simulation.title || 'סימולציה ללא כותרת'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Main Info Section */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Type */}
            <Paper sx={{ 
              p: 2, 
              flex: 1, 
              minWidth: 200,
              backgroundColor: `${typeConfig.color}10`,
              border: `2px solid ${typeConfig.color}30`
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <typeConfig.icon sx={{ color: typeConfig.color, fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: typeConfig.color, fontWeight: 'bold' }}>
                  סוג הסימולציה
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: typeConfig.color, fontWeight: 'medium' }}>
                {simulation.type || 'לא מוגדר'}
              </Typography>
            </Paper>

            {/* Difficulty */}
            <Paper sx={{ 
              p: 2, 
              flex: 1, 
              minWidth: 200,
              backgroundColor: `${difficultyConfig.color}10`,
              border: `2px solid ${difficultyConfig.color}30`
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <difficultyConfig.icon sx={{ color: difficultyConfig.color, fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: difficultyConfig.color, fontWeight: 'bold' }}>
                  רמת קושי
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: difficultyConfig.color, fontWeight: 'medium' }}>
                {simulation.difficulty || 'לא מוגדר'}
              </Typography>
            </Paper>
          </Box>

          <Divider />

          {/* Topics and Roles Section */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Help sx={{ fontSize: 20 }} />
              נושאים ותפקידים
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Main Topic */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  נושא מרכזי:
                </Typography>
                <Chip 
                  label={simulation.main_sim_topic || 'לא מוגדר'} 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontSize: '0.9rem', fontWeight: 'medium' }}
                />
              </Box>

              {/* Main Role */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  תפקיד מרכזי:
                </Typography>
                <Chip 
                  label={simulation.main_role_tag || 'כללי'} 
                  color="secondary" 
                  variant="outlined"
                  sx={{ fontSize: '0.9rem', fontWeight: 'medium' }}
                />
              </Box>

              {/* Additional Topics */}
              {simulation.additional_sim_topics && simulation.additional_sim_topics.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    נושאים נוספים:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {simulation.additional_sim_topics.map((topic, index) => (
                      <Chip 
                        key={index}
                        label={topic} 
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.8rem' }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Additional Roles */}
              {simulation.additional_role_tags && simulation.additional_role_tags.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    תפקידים נוספים:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {simulation.additional_role_tags.map((role, index) => (
                      <Chip 
                        key={index}
                        label={role} 
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.8rem' }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Divider />

          {/* Week Information */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 20 }} />
              מידע שבועי
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Main Week */}
              {simulation.main_week && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    שבוע מרכזי:
                  </Typography>
                  <Chip 
                    label={simulation.main_week} 
                    color="info" 
                    variant="outlined"
                    sx={{ fontSize: '0.9rem', fontWeight: 'medium' }}
                  />
                </Box>
              )}

              {/* Additional Weeks */}
              {simulation.additional_weeks && simulation.additional_weeks.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    שבועות נוספים:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {simulation.additional_weeks.map((week, index) => (
                      <Chip 
                        key={index}
                        label={week} 
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.8rem' }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Divider />

          {/* Link Section */}
          {simulation.url && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinkIcon sx={{ fontSize: 20 }} />
                קישור לסימולציה
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LinkIcon />}
                href={simulation.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 'medium',
                  px: 3,
                  py: 1
                }}
              >
                פתח סימולציה
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SimulationWindow;
