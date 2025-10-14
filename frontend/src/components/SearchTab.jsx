import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import SimulationListEntry from './SimulationListEntry';
import SimulationWindow from './SimulationWindow';
import ErrorBox from './ErrorBox';
import { searchSimulations } from '../utils/searchAlgorithm';

function SearchTab() {
    // Hooks related to the low level state
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
    
    // Data related to the opened simulation window
    const [selectedSimulation, setSelectedSimulation] = useState(null);
    const [isWindowOpen, setIsWindowOpen] = useState(false);

    // Hooks related to the searching process
    const allSims = useMemo(
        () => 
            serverData === null? null :
            !('simulations' in serverData)? [] :
            serverData.simulations,
        [serverData]
    );
    const [searchObject, setSearchObject] = useState({
        simTopics: [],
        roleTags: [],
        weeks: [],
        difficulty: null,
        type: null,
    });
    const [displayedSims, setDisplayedSims] = useState([]);
    const [isSearching, setIsSearching] = useState(true);
    useEffect(() => {
        // Server data hasn't arrived yet - skip searching and keep UI governed by serverData === null
        if (allSims === null) {
            return;
        }
        let isCancelled = false;
        setIsSearching(true);
        // Defer heavy computation to allow spinner to render first
        const handle = setTimeout(() => {
            if (isCancelled) return;
            const result = searchSimulations(allSims, searchObject);
            if (!isCancelled) {
                setDisplayedSims(result);
                setIsSearching(false);
            }
        }, 0);
        return () => {
            isCancelled = true;
            clearTimeout(handle);
        };
    }, [searchObject, allSims]);

    // Data used to guide searching
    const sim_topics = useMemo(() => serverData?.simulation_topics ?? [], [serverData]);
    const role_tags = useMemo(() => serverData?.role_tags ?? [], [serverData]);
    const week_topics = useMemo(() => serverData?.week_topics ?? [], [serverData]);

    const handleSimulationClick = (simulation) => {
        setSelectedSimulation(simulation);
        setIsWindowOpen(true);
    };

    const handleCloseWindow = () => {
        setIsWindowOpen(false);
        setSelectedSimulation(null);
    };

    if (serverData === null || isSearching) {
        const waitingForServer = serverData === null;
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', gap: 2 }}>
                <CircularProgress size={48} />
                <Typography variant="body2" color="text.secondary">
                    {waitingForServer ? 'טוען נתונים מהשרת…' : 'מחפש סימולציות…'}
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
                    {displayedSims.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">
                            לא נמצאו סימולציות מתאימות.
                        </Typography>
                    ) : (
                        <Box>
                            {displayedSims.map((simulation, index) => (
                                <SimulationListEntry 
                                    key={simulation.id || index} 
                                    simulation={simulation}
                                    onClick={() => handleSimulationClick(simulation)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
            
            <SimulationWindow 
                open={isWindowOpen}
                onClose={handleCloseWindow}
                simulation={selectedSimulation}
            />
        </>
    );
}

export default SearchTab;
