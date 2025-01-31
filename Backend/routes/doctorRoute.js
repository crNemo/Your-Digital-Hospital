import express from 'express'
import { doctorList } from '../controllers/doctorController.js'
import Doctor from '../models/doctorModel.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json({ success: true, doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default doctorRouter;