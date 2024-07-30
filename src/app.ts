import express, { Application } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user-routes';
import errorHandler from './middleware/error-handler';
import cors from 'cors';

dotenv.config();

const app: Application = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allows requests from the Angular application
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify the allowed headers
}));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.redirect('/api/users');
});

app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

export default app;