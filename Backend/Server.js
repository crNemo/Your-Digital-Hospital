import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import notificationDB from './models/notificationModel.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import bedRouter from './routes/bedRoute.js';

// Load environment variables from .env file
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;
const googleAPIKey = process.env.GOOGLE_API_KEY; // Make sure your API key is in a .env file
const mongoDbUri = process.env.MONGODB_URI; // Use MONGODB_URI

// Check if GOOGLE_API_KEY is set
if (!googleAPIKey) {
    console.error("Error: GOOGLE_API_KEY is not defined in the .env file");
    process.exit(1); // Exit if the API key is not defined
}


// Connect to the database and cloudinary
connectDB(mongoDbUri); // Pass the URI to connectDB
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/beds', bedRouter);
app.use('/api/user', userRouter);

// Notification endpoints
app.get('/api/notification', async (req, res) => {
    const Data = await notificationDB.find();
    res.send(Data);
});

app.post('/api/create', async (req, res) => {
    const { title, body } = req.body;

    const DataToSave = {
        title,
        body,
        date: Date.now(),
    };

    const SavedInfo = new notificationDB(DataToSave);
    await SavedInfo.save();
    res.status(201).json({ message: 'Notification created successfully' });
});

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(googleAPIKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

// Disease Recognition Endpoint
app.post('/api/recognize', async (req, res) => {
    const user_input = req.body.message;

    try {
        const prompt = `Given the following symptoms: "${user_input}", what could be the possible disease? provide a response that is short but informative.`;
         console.log("Prompt sent to Gemini API", prompt);
        const result = await model.generateContent(prompt);
        console.log("API response", result);
        const response = await result.response.text();
        res.json({ response: response });

    } catch (error) {
       console.error('Error calling Gemini API:', error);
        console.error('Full Error Object:', error);
        res.status(500).json({ error: 'Error processing your request.' });
    }
});

app.get('/', (req, res) => {
    res.send('API WORKING');
});
app.post('/test', (req, res) => {
    res.json({ message: 'Test route reached successfully!', requestBody: req.body });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

