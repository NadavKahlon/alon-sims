import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SimulationList from './SimulationList';
import SimulationWindow from './SimulationWindow';
import ErrorBox from './ErrorBox';
import { searchSimulations } from '../utils/searchAlgorithm';
import ChipSearchBar from './ChipSearchBar';
import ChipSelectWindow from './ChipSelectWindow';

function SearchTab() {

    // Getting data from the server
    const [serverData, setServerData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const abortController = new AbortController();
        const loadAll = async () => {
            setError(null);
            try {
                const response = await fetch('/api/all', { signal: abortController.signal });
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                const json = await response.json() || {};
                setServerData(json);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log(err)
                    setError(err);
                }
            }
        };
        loadAll();
        return () => abortController.abort();
    }, []);

    // Build simulation topic sections from the server data
    const topicSections = useMemo(() =>
        (serverData?.simulation_topics ?? []).map((s) => ({
            type: s.topicType,
            items: s.topics,
            color: s.color
        })),
        [serverData]
    );

    // Build role sections from the server data (flat structure with grey color)
    const roleSections = useMemo(() => {
        const roleTags = serverData?.role_tags ?? [];
        return [{
            type: 'תפקידים',
            items: roleTags,
            color: '#424242' // Grey color for all role chips
        }];
    }, [serverData]);

    // Build weeks sections from the server data (flat structure with grey color)
    const weeksSections = useMemo(() => {
        const weekTopics = serverData?.week_topics ?? [];
        return [{
            type: 'נושאים שבועיים',
            items: weekTopics,
            color: '#424242' // Grey color for all week chips
        }];
    }, [serverData]);
    
    const [searchObject, setSearchObject] = useState({
        simTopics: [],
        roleTags: [],
        weeks: [],
        difficulty: ['קלה', 'בינונית', 'קשה'],
        type: ['מתפרצת', 'פורמלית'],
    });
    const [displayedSims, setDisplayedSims] = useState([]);

    useEffect(() => {
        setDisplayedSims(searchSimulations(serverData?.simulations ?? [], searchObject));
    }, [serverData, searchObject]);

    // Toggles for open windows
    const [openedSimulation, setOpenedSimulation] = useState(null);
    const [isTopicWindowOpen, setIsTopicWindowOpen] = useState(false);
    const [isRoleWindowOpen, setIsRoleWindowOpen] = useState(false);
    const [isWeeksWindowOpen, setIsWeeksWindowOpen] = useState(false);
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

    // Callbacks
    const handleCloseSimulation = useCallback(() => {
        setOpenedSimulation(null);
    }, []);
    const handleSimTopicsChange = useCallback((sel) => {
        setSearchObject((prev) => ({ ...prev, simTopics: sel }));
    }, []);
    const handleRoleTagsChange = useCallback((sel) => {
        setSearchObject((prev) => ({ ...prev, roleTags: sel }));
    }, []);
    const handleWeeksChange = useCallback((sel) => {
        setSearchObject((prev) => ({ ...prev, weeks: sel }));
    }, []);
    const handleTypeChange = useCallback((type) => {
        setSearchObject((prev) => ({ ...prev, type }));
    }, []);
    const handleDifficultyChange = useCallback((difficulty) => {
        setSearchObject((prev) => ({ ...prev, difficulty }));
    }, []);
    const handleAdvancedClick = useCallback(() => {
        setIsTopicWindowOpen(true);
    }, []);
    const handleRoleAdvancedClick = useCallback(() => {
        setIsRoleWindowOpen(true);
    }, []);
    const handleWeeksAdvancedClick = useCallback(() => {
        setIsWeeksWindowOpen(true);
    }, []);
    const handleTopicWindowClose = useCallback(() => {
        setIsTopicWindowOpen(false);
    }, []);
    const handleRoleWindowClose = useCallback(() => {
        setIsRoleWindowOpen(false);
    }, []);
    const handleWeeksWindowClose = useCallback(() => {
        setIsWeeksWindowOpen(false);
    }, []);
    const handleAdvancedSearchToggle = useCallback(() => {
        setIsAdvancedSearchOpen(prev => !prev);
    }, []);

    if (serverData === null) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', gap: 2 }}>
                <CircularProgress size={48} />
                <Typography variant="body2" color="text.secondary">
                    טוען נתונים מהשרת…
                </Typography>
            </Box>
        );
    }

    if (error) {
        return <ErrorBox error={error} />;
    }

    return (
        <>
            <Box sx={{ 
                p: 3, 
                display: 'flex', 
                justifyContent: 'center',
                width: '100%'
            }}>
                <Box sx={{ 
                    width: '100%', 
                    maxWidth: 800,
                    minWidth: 300
                }}>
                    <Box sx={{ mb: 3 }}>
                        <FormLabel component="legend" sx={{ mb: 2, fontWeight: 700, fontSize: '1.1rem', color: 'primary.main' }}>
                            מאפייני התאמה
                        </FormLabel>
                        <Box sx={{ mb: 2 }}>
                            <ChipSearchBar
                                sections={topicSections}
                                selected={searchObject.simTopics}
                                label={"נושאי הסימולציה"}
                                onSelectedChange={handleSimTopicsChange}
                                onAdvanced={handleAdvancedClick}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <ChipSearchBar
                                sections={roleSections}
                                selected={searchObject.roleTags}
                                label={"מסלולים ועיסוקים"}
                                onSelectedChange={handleRoleTagsChange}
                                onAdvanced={handleRoleAdvancedClick}
                            />
                        </Box>
                        
                        {/* Advanced Search Section */}
                        <Box sx={{ mb: 2 }}>
                        <Collapse in={isAdvancedSearchOpen} collapsedSize={0}>
                            <Box sx={{ 
                                mb: 2,
                                mt: 0
                            }}>
                                <Box sx={{ mb: 2 }}>
                                    <ChipSearchBar
                                        sections={weeksSections}
                                        selected={searchObject.weeks}
                                        label={"נושאים שבועיים"}
                                        onSelectedChange={handleWeeksChange}
                                        onAdvanced={handleWeeksAdvancedClick}
                                    />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
                                            סוג סימולציה
                                        </FormLabel>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={searchObject.type.includes('מתפרצת')}
                                                        onChange={(e) => {
                                                            const newType = e.target.checked
                                                                ? [...searchObject.type, 'מתפרצת']
                                                                : searchObject.type.filter(t => t !== 'מתפרצת');
                                                            handleTypeChange(newType);
                                                        }}
                                                    />
                                                }
                                                label="מתפרצת"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={searchObject.type.includes('פורמלית')}
                                                        onChange={(e) => {
                                                            const newType = e.target.checked
                                                                ? [...searchObject.type, 'פורמלית']
                                                                : searchObject.type.filter(t => t !== 'פורמלית');
                                                            handleTypeChange(newType);
                                                        }}
                                                    />
                                                }
                                                label="פורמלית"
                                            />
                                        </Box>
                                    </FormControl>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
                                            רמת קושי
                                        </FormLabel>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={searchObject.difficulty.includes('קלה')}
                                                        onChange={(e) => {
                                                            const newDifficulty = e.target.checked
                                                                ? [...searchObject.difficulty, 'קלה']
                                                                : searchObject.difficulty.filter(d => d !== 'קלה');
                                                            handleDifficultyChange(newDifficulty);
                                                        }}
                                                    />
                                                }
                                                label="קלה"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={searchObject.difficulty.includes('בינונית')}
                                                        onChange={(e) => {
                                                            const newDifficulty = e.target.checked
                                                                ? [...searchObject.difficulty, 'בינונית']
                                                                : searchObject.difficulty.filter(d => d !== 'בינונית');
                                                            handleDifficultyChange(newDifficulty);
                                                        }}
                                                    />
                                                }
                                                label="בינונית"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={searchObject.difficulty.includes('קשה')}
                                                        onChange={(e) => {
                                                            const newDifficulty = e.target.checked
                                                                ? [...searchObject.difficulty, 'קשה']
                                                                : searchObject.difficulty.filter(d => d !== 'קשה');
                                                            handleDifficultyChange(newDifficulty);
                                                        }}
                                                    />
                                                }
                                                label="קשה"
                                            />
                                        </Box>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Collapse>
                        
                        <Button
                            onClick={handleAdvancedSearchToggle}
                            endIcon={isAdvancedSearchOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 400,
                                color: 'text.secondary',
                                p: 1,
                                minWidth: 'auto',
                                justifyContent: 'space-between',
                                width: '100%',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                backgroundColor: 'background.paper',
                                '&:hover': {
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            {isAdvancedSearchOpen ? 'סגור חיפוש מתקדם' : 'חיפוש מתקדם...'}
                        </Button>
                        </Box>
                    </Box>
                    <SimulationList 
                        simulations={displayedSims}
                        onSimulationClick={setOpenedSimulation}
                    />
                </Box>
            </Box>
            
            <ChipSelectWindow
                open={isTopicWindowOpen}
                header={"בחר נושאי סימולציה"}
                sections={topicSections}
                initialSelected={searchObject.simTopics}
                onSelectedChange={handleSimTopicsChange}
                onClose={handleTopicWindowClose}
            />

            <ChipSelectWindow
                open={isRoleWindowOpen}
                header={"מסלולים ועיסוקים"}
                sections={roleSections}
                initialSelected={searchObject.roleTags}
                onSelectedChange={handleRoleTagsChange}
                onClose={handleRoleWindowClose}
                flat={true}
            />

            <ChipSelectWindow
                open={isWeeksWindowOpen}
                header={"נושאים שבועיים"}
                sections={weeksSections}
                initialSelected={searchObject.weeks}
                onSelectedChange={handleWeeksChange}
                onClose={handleWeeksWindowClose}
                flat={true}
            />

            <SimulationWindow 
                open={openedSimulation !== null}
                onClose={handleCloseSimulation}
                simulation={openedSimulation}
            />
        </>
    );
}

export default SearchTab;
