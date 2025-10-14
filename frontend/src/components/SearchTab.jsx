import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
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
        difficulty: null,
        type: null,
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
                    <Box sx={{ mb: 2 }}>
                        <ChipSearchBar
                            sections={weeksSections}
                            selected={searchObject.weeks}
                            label={"נושאים שבועיים"}
                            onSelectedChange={handleWeeksChange}
                            onAdvanced={handleWeeksAdvancedClick}
                        />
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
