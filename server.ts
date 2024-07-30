import app from './src/app';
import connectDB from './src/config/database';

connectDB();

// const PORT: number = parseInt(process.env.PORT || '4000', 10);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
