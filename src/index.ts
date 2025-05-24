// backend/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

const allowedOrigins = [
    'http://localhost:3000', //local deployment
    process.env.FRONTEND_URL //deployed Next.js app URL
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Middleware
app.use(cors(corsOptions)); // Enable CORS for all routes // Apply CORS options
app.use(express.json()); // For parsing application/json

// --- Routes ---

// Root endpoint
app.get('/', (request, response) => {
    response.status(200).send({ msg: 'Hello from the Backend!' });
});

// API endpoint for dummy users
app.get('/api/users', (request, response) => {
    const users = [
        { id: 1, username: 'jhon', displayName: 'Jhon Doe' },
        { id: 2, username: 'jane', displayName: 'Jane Doe' },
        { id: 3, username: 'peter', displayName: 'Peter Pan' },
    ];
    response.status(200).json(users); // Using .json() is preferred for sending JSON data
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});