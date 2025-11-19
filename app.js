import express from 'express';
import dotenv from 'dotenv';
// Load environment variables immediately
dotenv.config();

// The import for your database connection function
import db from './connection.js'; 

const app = express();
// Use port from environment or default to 3000
const port = process.env.PORT || 3000;

import cors from 'cors';
app.use(cors())

// Middleware (You'll need this for your API endpoints)
app.use(express.json()); 

// Health Check Endpoint (Keep this)
app.get('/healthz', (req, res) => {
    res.status(200).json({ "ok": true, "version": "1.0" });
});

//main redirect Endpoint
import getCode from './controllers/getCode.js';
app.get('/:code', getCode)


// Define your routes (e.g., app.use('/api', apiRoutes))
import apiRoutes from './route.js'
app.use('/api', apiRoutes)


// --- Server Startup Logic ---
const startServer = async () => {
    try {
        // 1. Connect to the database first and AWAIT its completion
        await db(); 
        
        // 2. Start the Express server ONLY after the DB connection is successful
        app.listen(port, () => {
            console.log(`✅ Database connected successfully.`);
            console.log(`🚀 Server started listening on port ${port}`);
            console.log(`🔗 Health check available at http://localhost:${port}/healthz`);
        });

    } catch (error) {
        console.error('❌ Failed to connect to the database or start the server:', error);
        // Exit process if database connection fails, as the app is unusable
        process.exit(1); 
    }
};

startServer();