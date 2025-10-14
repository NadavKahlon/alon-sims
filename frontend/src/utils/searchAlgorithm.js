/**
 * Prioritize a simulation based on the search criteria.
 * @param {Object} sim - Simulation to prioritize.
 * @param {Object} searchObject - Search criteria (see SearchTab.jsx).
 * @returns {number} A number representing the priority of the simulation (higher number means
 *  higher priority). Non-positive number indicates to exclude the simulation.
 */
function prioritizeSimulation(sim, searchObject) {
    return 1;
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
		.filter((item) => Number.isFinite(item.priority) && item.priority > 0);

	prioritized.sort((a, b) => {
		if (b.priority !== a.priority) {
			return b.priority - a.priority; // higher priority first
		}
		return a.index - b.index; // stable order for equal priorities
	});

	return prioritized.map((item) => item.sim);
}
