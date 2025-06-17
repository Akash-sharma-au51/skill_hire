import express from 'express';

import cookieparser from 'cookie-parser';

import connectDB from './config/db.config.js';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';








const app = express();

const port = process.env.PORT ||5000


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

// Middleware
app.use(express.json());
app.use(cookieparser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);





// Connect to the database
connectDB().then(() => {
    console.log('Connected to MongoDB');
    
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with failure
});


