import express, { Application } from 'express';
import cors from 'cors';
import logRoutes from './routes/log-routes';

const app: Application = express();

app.use(cors({
    // origin: process.env.ALLOW_ORIGINS,
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/', logRoutes);
app.use('/api/log', logRoutes);

export default app;