import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import SimulationListEntry from './SimulationListEntry';
import SimulationWindow from './SimulationWindow';

function SearchTab() {
    const [serverData, setServerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSimulation, setSelectedSimulation] = useState(null);
    const [isWindowOpen, setIsWindowOpen] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const loadAll = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/all', { signal: abortController.signal });
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                const json = await response.json();
                setServerData(json);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log(err)
                    setError(err);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadAll();
        return () => abortController.abort();
    }, []);

    const all_sims = useMemo(() => serverData?.simulations ?? [], [serverData]);
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

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
                <CircularProgress size={48} />
            </Box>
        );
    }

    if (error) {
        return error.toString();
    }

    return (
        <>
            <Box sx={{ p: 3 }}>
                {all_sims.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        לא נמצאו סימולציות מתאימות.
                    </Typography>
                ) : (
                    <Box>
                        {all_sims.map((simulation, index) => (
                            <SimulationListEntry 
                                key={simulation.id || index} 
                                simulation={simulation}
                                onClick={() => handleSimulationClick(simulation)}
                            />
                        ))}
                    </Box>
                )}
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
