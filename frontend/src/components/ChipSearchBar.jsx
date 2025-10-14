import React, { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TuneIcon from '@mui/icons-material/Tune';

/**
 * ChipSearchBar
 *
 * Props:
 * - sections: Array<{ type: string, items: string[], color: string }>
 * - selected?: string[]
 * - onInputChange?: (value: string) => void
 * - onSelectedChange?: (values: string[]) => void
 * - onAdvanced?: () => void
 * - placeholder?: string (default: "חפש...")
 * - label?: string
 */
function ChipSearchBar({
  sections,
  selected = [],
  onInputChange,
  onSelectedChange,
  onAdvanced,
  placeholder = 'חפש...',
  label,
}) {
    
  // Build unique options and a color map from sections
  const { options, colorMap } = useMemo(() => {
    const map = {};
    if (Array.isArray(sections)) {
      for (const section of sections) {
        const color = section?.color || '#9e9e9e';
        for (const item of section?.items || []) {
          if (!(item in map)) { 
            map[item] = color;
          }
        }
      }
    }
    return { options: Object.keys(map), colorMap: map };
  }, [sections]);

  const [inputValue, setInputValue] = useState('');

  const handleChange = useCallback((_, newValue) => {
    if (typeof onSelectedChange === 'function') onSelectedChange(newValue);
  }, [onSelectedChange]);

  const handleInputChange = useCallback((_, newInputValue) => {
    setInputValue(newInputValue);
    if (typeof onInputChange === 'function') onInputChange(newInputValue);
  }, [onInputChange]);

    return (
        <Autocomplete
            multiple
            size="medium"
            options={options}
            value={selected}
            inputValue={inputValue}
            onChange={handleChange}
            onInputChange={handleInputChange}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                        size="small"
                        variant="outlined"
                        sx={{
                            bgcolor: `${colorMap[option] || '#e0e0e0'}15`,
                            color: colorMap[option] || '#e0e0e0',
                            borderColor: colorMap[option] || '#e0e0e0',
                            '& .MuiChip-deleteIcon': { color: colorMap[option] || '#e0e0e0' },
                        }}
                    />
                ))
            }
            renderOption={(props, option) => (
                <li {...props} key={option} style={{ padding: '2px 4px' }}>
                <Chip 
                    label={option} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                    bgcolor: `${colorMap[option] || '#e0e0e0'}15`,
                    color: colorMap[option] || '#e0e0e0',
                    borderColor: colorMap[option] || '#e0e0e0',
                    margin: '1px',
                    '&:hover': {
                        bgcolor: `${colorMap[option] || '#e0e0e0'}25`,
                    }
                    }} 
                />
                </li>
            )}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            freeSolo={false}
            clearOnBlur={false}
            renderInput={(params) => (
                <Box sx={{ position: 'relative', width: '100%' }}>
                <TextField
                    {...params}
                    placeholder={placeholder}
                    label={label}
                    InputProps={{
                    ...params.InputProps,
                    endAdornment: params.InputProps.endAdornment,
                    }}
                    sx={{
                    '& .MuiInputBase-root': {
                        fontSize: '1rem',
                        alignItems: 'center',
                    },
                    '& .MuiInputBase-input': {
                        paddingRight: 5, // Space for the advanced button
                    },
                    }}
                />
                <Tooltip title="בחירה מתקדמת">
                    <IconButton 
                    size="small" 
                    onClick={onAdvanced} 
                    aria-label="advanced search"
                    sx={{ 
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        '&:hover': {
                        bgcolor: 'action.hover',
                        }
                    }}
                    >
                    <TuneIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                </Box>
            )}
            sx={{ width: '100%' }}
            />
        );
}

export default ChipSearchBar;
