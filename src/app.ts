import express, { Application } from 'express';
import companyRoutes from './routes/company-routes';
import ersaRoutes from './routes/ersa-routes';
// import errorHandler from './middleware/error-handler';
import cors from 'cors';
// import connectDB from './config/database';
import logRoutes from './routes/log-routes';

const app: Application = express();

// connectDB();

app.use(cors({
    // origin: process.env.ALLOW_ORIGINS,
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    try {
        res.redirect('/api/company');
    }
    catch (ex) {
        res.send('some error occured while calling /api/company: ' + ex)
    }
});

app.use('/api/company', companyRoutes);
app.use('/api/ersa', ersaRoutes);
app.use('/api/log', logRoutes);

// Error handling
// app.use(errorHandler);

export default app;