import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import notificationDB from './models/notificationModel.js'
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

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
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter)

app.get('/api/notification',async(req,res)=>{
    const Data = await notificationDB.find()

    res.send(Data)
    
})
app.post('/api/create',async(req,res)=>{

    const title = req.body.title
    const body = req.body.body

    const DataToSave = {
        title,
        body,
        date:Date.now()
    } 
    
    const SavedInfo = new notificationDB(DataToSave)
    await SavedInfo.save()
    

})

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
