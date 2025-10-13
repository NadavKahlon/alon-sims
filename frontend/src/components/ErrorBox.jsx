import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function ErrorBox({ error }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '100%', 
            height: '100vh',
            p: 3
        }}>
            <Card sx={{ 
                maxWidth: 500, 
                width: '100%',
                boxShadow: 3,
                border: '1px solid',
                borderColor: 'error.dark',
                bgcolor: 'rgba(244, 67, 54, 0.1)'
            }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <ErrorOutlineIcon 
                        sx={{ 
                            fontSize: 64, 
                            color: 'error.main', 
                            mb: 2 
                        }} 
                    />
                    
                    <Typography variant="h5" color="error.dark" gutterBottom>
                        שגיאה
                    </Typography>
                    
                    <Typography variant="body1" color="error.dark" sx={{ mb: 3 }}>
                        אנו מצטערים, אך לא ניתן להשלים את הפעולה.
                    </Typography>
                    
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setShowDetails(!showDetails)}
                        endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{ mb: 2, gap: 1, pl: 0 }}
                    >
                        {showDetails ? 'הסתר פרטים' : 'פרטים מתקדמים'}
                    </Button>
                    
                    <Collapse in={showDetails}>
                        <Box sx={{ 
                            mt: 2, 
                            p: 2, 
                            bgcolor: 'grey.50', 
                            borderRadius: 1
                        }}>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom sx={{ textAlign: 'right' }}>
                                פרטי השגיאה:
                            </Typography>
                            <Typography 
                                variant="body2" 
                                component="pre" 
                                sx={{ 
                                    fontFamily: 'monospace',
                                    fontSize: '0.75rem',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-all',
                                    textAlign: 'left'
                                }}
                            >
                                {error.toString()}
                            </Typography>
                        </Box>
                    </Collapse>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ErrorBox;
