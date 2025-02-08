import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import notificationDB from './models/notificationModel.js';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import bedRouter from './routes/bedRoute.js';
import { Server } from "socket.io";
//import { StreamChat } from 'stream-chat';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const googleAPIKey = process.env.GOOGLE_API_KEY;
//const apiKey = process.env.REACT_APP_STREAM_API_KEY; // Updated variable name
//const apiSecret = process.env.STREAM_API_SECRET;

if (!googleAPIKey) {
    console.error("Error: GOOGLE_API_KEY is not defined in the .env file");
    process.exit(1);
}

connectDB(process.env.MONGODB_URI);
connectCloudinary();

app.use(express.json());
app.use(cors());

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
    const { title, body,user } = req.body;

    const DataToSave = {
        title,
        body,
        date: Date.now(),
        user
    };

    const SavedInfo = new notificationDB(DataToSave);
    await SavedInfo.save();
    res.status(201).json({ message: 'Notification created successfully' });
});
app.post('/api/comment',async(req,res)=>{
    const {id,user,comment} = req.body
    console.log(user)
    if (id &&user &&comment){
        await notificationDB.updateOne(
            {_id:id},
            {$push:{comments:{user:user,comment:comment}}}
        )
    }
})

app.get('/api/get-comments',async(req,res)=>{
    const id = req.headers.id
    const AllComments = await notificationDB.findById(id,"comments")
    if (AllComments){
        res.send(AllComments)
    }
})
// Initialize Gemini API
const genAI = new GoogleGenerativeAI(googleAPIKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

app.post('/api/recognize', async (req, res) => {
    const user_input = req.body.message;

    try {
        const prompt = `Given the following symptoms: "${user_input}", what could be the possible disease? provide a response that is short but informative & also provide percentange probability of the disease and speciality of doctor to consult.`;
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

// Helper function to generate a random room name
function generateRoomName() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let roomName = '';
    for (let i = 0; i < 10; i++) { // Adjust length as needed
        roomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomName;
}

// New endpoint to generate a Jitsi Meet room name
app.get('/api/jitsi/room-name', (req, res) => {
    const roomName = generateRoomName();
    res.json({ roomName });
});

app.get('/', (req, res) => {
    res.send('API WORKING');
});
app.post('/test', (req, res) => {
    res.json({ message: 'Test route reached successfully!', requestBody: req.body });
});

// Socket.IO setup
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = new Server(server, {
    cors: {
        origin: "*",  // Replace with your React app's origin in production
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    socket.on('call-user', ({ userToCall, from, name, roomName }) => {
        io.to(userToCall).emit('incoming-call', {  from, name,socketID:socket.id, roomName });
        console.log('calling',userToCall)
    });

        socket.on('user-joined', ({ roomName, from }) => {
            // Notify the doctor that the user has joined the room
            io.to(from).emit('user-joined-call', { roomName });
            console.log(`User joined room ${roomName}, notifying doctor ${from}`);
        });

    socket.on("disconnect", () => {
        console.log("🔥: A user disconnected",socket.id);
      });
});
export { io };