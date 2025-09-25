const express = require('express');
const path = require('path');
const apiRouter = require('./api'); // Imports the router from src/api/index.js

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the API router for all routes starting with /api
// For example, a request to /api/data will be handled by the apiRouter
app.use('/api', apiRouter);

// Serve static files from the 'public' directory (for HTML, CSS, client-side JS)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
  console.log(`MCP Server listening at http://localhost:${port}`);
});