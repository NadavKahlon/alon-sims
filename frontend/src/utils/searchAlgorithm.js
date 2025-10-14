/**
 * Prioritize a simulation based on the search criteria.
 * 
 * Each simulation gets a priority score, calculated by the sum of the points for 
 * each of its characteristics that is included in the search selection:
 * 
 * ┌────────────────────────────────────────────────┐
 * │ Condition                │    Points           │
 * ├──────────────────────────┼─────────────────────┤
 * │ Main topic               │   +1000             │
 * │ Additional topic         │   +50 (per match)   │
 * │ Main role tag            │   +1000             │
 * │ Additional role tag      │   +100 (per match)  │
 * │ Main week                │   +500              │
 * │ Additional week          │   +50 (per match)   │
 * └──────────────────────────┴─────────────────────┘
 * 
 * The simulation is excluded if and only if:
 * 1. Its type or difficulty are not searched for.
 * 2. Some specific characteristic (topic, role, week) is being searched for and the 
 *    simulation is not associated with it at all.
 * 
 * @param {Object} sim - Simulation to prioritize.
 * @param {Object} searchObject - Search criteria (see SearchTab.jsx).
 * @returns {number} A number representing the priority of the simulation (higher number means
 *  higher priority). Negative number indicates to exclude the simulation.
 */
function prioritizeSimulation(sim, searchObject) {
    let priority = 0;
    
    // Check exclusion criteria first
    // 1. Type or difficulty not searched for
    if (!searchObject.type.includes(sim.type) || !searchObject.difficulty.includes(sim.difficulty)) {
        return -1; // Exclude simulation
    }
    
    // 2. Check if specific characteristics are being searched for and simulation doesn't have them
    
    // Check main topic
    if (searchObject.simTopics.length > 0 && !searchObject.simTopics.includes(sim.main_sim_topic)) {
        return -1; // Exclude simulation
    }
    
    // Check main role tag
    if (searchObject.roleTags.length > 0 && sim.main_role_tag && !searchObject.roleTags.includes(sim.main_role_tag)) {
        return -1; // Exclude simulation
    }
    
    // Check main week
    if (searchObject.weeks.length > 0 && sim.main_week && !searchObject.weeks.includes(sim.main_week)) {
        return -1; // Exclude simulation
    }
    
    // Calculate priority score based on matches
    
    // Main topic match
    if (searchObject.simTopics.includes(sim.main_sim_topic)) {
        priority += 1000;
    }
    
    // Additional topics matches
    const additionalTopicMatches = sim.additional_sim_topics.filter(topic => 
        searchObject.simTopics.includes(topic)
    ).length;
    priority += additionalTopicMatches * 50;
    
    // Main role tag match
    if (sim.main_role_tag && searchObject.roleTags.includes(sim.main_role_tag)) {
        priority += 1000;
    }
    
    // Additional role tags matches
    const additionalRoleMatches = sim.additional_role_tags.filter(role => 
        searchObject.roleTags.includes(role)
    ).length;
    priority += additionalRoleMatches * 100;
    
    // Main week match
    if (sim.main_week && searchObject.weeks.includes(sim.main_week)) {
        priority += 500;
    }
    
    // Additional weeks matches
    const additionalWeekMatches = sim.additional_weeks.filter(week => 
        searchObject.weeks.includes(week)
    ).length;
    priority += additionalWeekMatches * 50;
    
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
