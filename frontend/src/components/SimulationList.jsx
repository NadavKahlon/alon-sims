import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SimulationListEntry from './SimulationListEntry';

/**
 * SimulationList component
 * 
 * Props:
 * - simulations: Array of simulation objects to display
 * - onSimulationClick: (simulation) => void, called when a simulation is clicked
 * - searchCriteria: Object containing search criteria for filtering chips
 * - emptyMessage?: string, message to show when no simulations (default: "לא נמצאו סימולציות מתאימות")
 */
function SimulationList({ 
    simulations = [], 
    onSimulationClick, 
    searchCriteria,
    emptyMessage = "לא נמצאו סימולציות מתאימות."
}) {

    // Show empty message if no simulations
    if (simulations.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary">
                {emptyMessage}
            </Typography>
        );
    }

    // Render the list of simulations
    return (
        <Box>
            {simulations.map((simulation, index) => (
                <SimulationListEntry 
                    key={simulation.id || index} 
                    simulation={simulation}
                    onClick={onSimulationClick}
                    searchCriteria={searchCriteria}
                />
            ))}
        </Box>
    );
}

export default SimulationList;
