import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function SearchTab() {
    const [serverData, setServerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return "Fetch works";
}

export default SearchTab;
