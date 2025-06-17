import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI


if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
    
}

const connectDB = async () =>{
    try {
        await mongoose.connect(uri)
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
        
    }
}

export default connectDB;


