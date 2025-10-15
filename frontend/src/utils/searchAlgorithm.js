/**
 * Prioritize a simulation based on the search criteria.
 * 
 * Each simulation gets a priority score, calculated by the sum of the points for 
 * each of its characteristics that is included in the search selection:
 * 
 * ┌────────────────────────────────────────────────┐
 * │ Condition                │    Points           │
 * ├──────────────────────────┼─────────────────────┤
 * │ Simulation topic         │   +1 (per match)    │
 * │ Week topic               │   +2                │
 * │ Role                     │   +2                │
 * └──────────────────────────┴─────────────────────┘
 * 
 * The simulation is excluded if and only if its type or difficulty are not searched for.
 * 
 * @param {Object} sim - Simulation to prioritize.
 * @param {Object} searchObject - Search criteria (see SearchTab.jsx).
 * @returns {number} A number representing the priority of the simulation (higher number means
 *  higher priority). Negative number indicates to exclude the simulation.
 */
function prioritizeSimulation(sim, searchObject) {
    let priority = 0;
    
    // Check exclusion criteria
    if (!searchObject.type.includes(sim.type) || !searchObject.difficulty.includes(sim.difficulty)) {
        return -1; // Exclude simulation
    }
    
    // Calculate priority score based on matches
    
    // Simulation topics matches (1 point each)
    const topicMatches = sim.simulation_topics.filter(topic => 
        searchObject.simTopics.includes(topic)
    ).length;
    priority += topicMatches * 1;
    
    // Week topic match (2 points)
    if (sim.week_topic && searchObject.weeks.includes(sim.week_topic)) {
        priority += 2;
    }
    
    // Role match (2 points)
    if (sim.role && searchObject.roleTags.includes(sim.role)) {
        priority += 2;
    }
    
    // Only exclude simulations with no matches if there are actually search criteria
    const hasSearchCriteria = searchObject.simTopics.length > 0 || 
                             searchObject.weeks.length > 0 || 
                             searchObject.roleTags.length > 0;
    
    if (hasSearchCriteria && priority === 0) {
        return -1; // Exclude simulation
    }
    
    return priority;
}

/**
 * Advanced search algorithm for simulations
 * @param {Array} allSims - All available simulations
 * @param {Object} searchObject - Search criteria (see SearchTab.jsx).
 * @returns {Array} Filtered and prioritized simulations
 */
export function searchSimulations(allSims, searchObject) {
	if (!Array.isArray(allSims) || allSims.length === 0) {
		return [];
	}

	const prioritized = allSims
		.map((sim, index) => ({
			sim,
			priority: prioritizeSimulation(sim, searchObject),
			index,
		}))
		.filter((item) => Number.isFinite(item.priority) && item.priority >= 0);

	prioritized.sort((a, b) => {
		if (b.priority !== a.priority) {
			return b.priority - a.priority; // higher priority first
		}
		return a.index - b.index; // stable order for equal priorities
	});

	return prioritized.map((item) => item.sim);
}
