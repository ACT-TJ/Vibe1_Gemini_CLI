const fs = require('fs').promises;
const path = require('path');

// Path is relative to this file's location (src/services)
const dbPath = path.join(__dirname, '..', '..', 'database.json');

/**
 * Reads and parses the database.json file.
 * @returns {Promise<object>} The parsed data from the JSON file.
 */
async function readData() {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
}

/**
 * Writes data to the database.json file.
 * @param {object} data The data to write to the file.
 */
async function writeData(data) {
    if (!data || !data.team || !data.timeline || !data.roles) {
        throw new Error('Invalid data format received for writing');
    }
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readData, writeData };
