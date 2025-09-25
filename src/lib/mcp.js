/**
 * Calculates the workload for each team member based on assigned tasks.
 * @param {Array} team - The array of team members.
 * @param {Array} tasks - The array of individual tasks.
 * @returns {Array} The team array with updated workload values.
 */
function calculateTeamWorkload(team, tasks) {
    const workloadMap = new Map(team.map(member => [member.id, 0]));

    // Count active tasks for each team member from the tasks array
    for (const task of tasks) {
        if (task.status === 'In Progress' && task.assigneeId) {
            if (workloadMap.has(task.assigneeId)) {
                const currentCount = workloadMap.get(task.assigneeId);
                workloadMap.set(task.assigneeId, currentCount + 1);
            }
        }
    }

    // Apply business logic to calculate workload percentage
    const updatedTeam = team.map(member => {
        const taskCount = workloadMap.get(member.id) || 0;
        let newWorkload = 0;
        if (taskCount === 1) {
            newWorkload = 50;
        } else if (taskCount === 2) {
            newWorkload = 90;
        } else if (taskCount >= 3) {
            newWorkload = 100;
        }
        return { ...member, workload: newWorkload };
    });

    return updatedTeam;
}

module.exports = { calculateTeamWorkload };