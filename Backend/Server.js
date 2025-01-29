import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// Load environment variables from .env file
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// Connect to the database and cloudinary
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start the server
app.listen(port, () => console.log("Server is running on port",port));