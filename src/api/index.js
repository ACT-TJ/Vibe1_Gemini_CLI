const express = require('express');
const db = require('../services/database');
const mcp = require('../lib/mcp');

const router = express.Router();

// Handles GET /api/data
router.get('/data', async (req, res) => {
    try {
        const data = await db.readData();
        res.json(data);
    } catch (error) {
        console.error('Error in GET /api/data:', error);
        res.status(500).json({ message: 'Error reading database' });
    }
});

// Handles POST /api/data
router.post('/data', async (req, res) => {
    try {
        let newData = req.body;

        // Recalculate workload using the MCP module with the tasks list
        const updatedTeam = mcp.calculateTeamWorkload(newData.team, newData.tasks);
        newData.team = updatedTeam;

        await db.writeData(newData);
        res.json({ message: 'Data saved successfully!' });
    } catch (error) {
        console.error('Error in POST /api/data:', error);
        res.status(500).json({ message: 'Error saving data' });
    }
});

module.exports = router;
