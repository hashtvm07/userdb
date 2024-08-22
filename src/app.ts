import express, { Application } from 'express';
import companyRoutes from './routes/company-routes';
import ersaRoutes from './routes/ersa-routes';
import errorHandler from './middleware/error-handler';
import cors from 'cors';
import connectDB from './config/database';

const app: Application = express();

connectDB();

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

// Error handling
app.use(errorHandler);

export default app;
module.exports = app;