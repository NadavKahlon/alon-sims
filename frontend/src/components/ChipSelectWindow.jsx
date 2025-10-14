import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

/**
 * ChipSelectWindow component
 *
 * Props:
 * - open: boolean (controls visibility)
 * - header: string (big header at the top)
 * - sections: Array<{ type: string, items: string[], color: string }>
 * - initialSelected: string[] initially selected chips
 * - onSelectedChange: (selected: string[]) => void, called when selection changes
 * - onClose: () => void, called when the window is closed
 * - flat?: boolean (if true, displays all chips in a single section without grouping)
 */
function ChipSelectWindow({ open, header, sections, initialSelected = [], onSelectedChange, onClose, flat = false }) {
    const normalizedSections = useMemo(() => Array.isArray(sections) ? sections : [], [sections]);
    const [selected, setSelected] = useState(Array.isArray(initialSelected) ? initialSelected : []);
    const onSelectedChangeRef = useRef(onSelectedChange);

    // Keep the ref up to date
    useEffect(() => {
        onSelectedChangeRef.current = onSelectedChange;
    }, [onSelectedChange]);

    useEffect(() => {
        setSelected(Array.isArray(initialSelected) ? initialSelected : []);
    }, [initialSelected, open]);

    useEffect(() => {
        if (typeof onSelectedChangeRef.current === 'function') {
            onSelectedChangeRef.current(selected);
        }
    }, [selected]); // Remove onSelectedChange from dependencies to prevent cascading updates

    const toggleChip = useCallback((label) => {
        setSelected((prev) => {
            if (prev.includes(label)) {
                return prev.filter((v) => v !== label);
            }
            return [...prev, label];
        });
    }, []);

    const handleClearSelection = useCallback(() => {
        setSelected([]);
    }, []);

    const handleChipClick = useCallback((label) => {
        toggleChip(label);
    }, [toggleChip]);

    // Blur any focused element when dialog closes
    useEffect(() => {
        if (!open) {
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
        }
    }, [open]);

    return (
        <Dialog 
            open={Boolean(open)} 
            onClose={onClose} 
            fullWidth 
            maxWidth="md"
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
                    {header}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 2, md: 3.5 } }}>
                {flat ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {normalizedSections.flatMap(section => section.items || []).map((label) => {
                        // Find the section this item belongs to for color
                        const section = normalizedSections.find(s => s.items?.includes(label));
                        const color = section?.color || '#9e9e9e';
                        
                        return (
                            <Chip
                                key={label}
                                label={label}
                                size="small"
                                onClick={() => handleChipClick(label)}
                                variant={selected.includes(label) ? 'filled' : 'outlined'}
                                sx={{
                                    bgcolor: selected.includes(label) ? color : 'transparent',
                                    color: selected.includes(label) ? '#fff' : color,
                                    borderColor: color,
                                    fontWeight: 500,
                                    '&:hover': {
                                        bgcolor: selected.includes(label) ? color : `${color}15`,
                                    },
                                }}
                            />
                        );
                    })}
                </Box>
            ) : (
                <Stack spacing={4}>
                    {normalizedSections.map((section, idx) => (
                        <Paper 
                            key={section.type || idx}
                            elevation={1}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                border: `2px solid ${section.color}20`,
                                bgcolor: `${section.color}05`
                            }}
                        >
                            <Box sx={{ mb: 2 }}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: section.color,
                                        mb: 1,
                                        fontSize: { xs: '1rem', md: '1.1rem' }
                                    }}
                                >
                                    {section.type}
                                </Typography>
                                <Divider sx={{ borderColor: `${section.color}40` }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                {(section.items || []).map((label) => (
                                    <Chip
                                        key={label}
                                        label={label}
                                        size="small"
                                        onClick={() => handleChipClick(label)}
                                        variant={selected.includes(label) ? 'filled' : 'outlined'}
                                        sx={{
                                            bgcolor: selected.includes(label) ? section.color : 'transparent',
                                            color: selected.includes(label) ? '#fff' : section.color,
                                            borderColor: section.color,
                                            fontWeight: 500,
                                            '&:hover': {
                                                bgcolor: selected.includes(label) ? section.color : `${section.color}15`,
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            )}
            </DialogContent>
            <DialogActions sx={{ p: 2, px: 2.5, gap: 1 }}>
                <Button 
                    onClick={handleClearSelection} 
                    variant="outlined" 
                    size="small" 
                    sx={{ 
                        textTransform: 'none', 
                        fontSize: { xs: '0.85rem', md: '1rem' },
                    }}
                >
                    נקה בחירה
                </Button>
                <Button onClick={onClose} variant="outlined" size="small" sx={{ 
                    textTransform: 'none', 
                    fontSize: { xs: '0.85rem', md: '1rem' },
                }}>
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChipSelectWindow;


