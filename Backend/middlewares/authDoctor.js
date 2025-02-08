import jwt from 'jsonwebtoken';
import Doctor from '../models/doctorModel.js';

const authDoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log('Token missing');
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doctor = await Doctor.findById(decoded.id).select('-password');
        if (!doctor) {
            console.log('Doctor not found');
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        req.docId = doctor._id; // Set req.docId to the doctor's _id
        console.log('Doctor authenticated:', req.docId);
        next();
    } catch (error) {
        console.error('Error in authDoctor middleware:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
        }
        res.status(401).json({ success: false, message: "Invalid Token, Login Again" });
    }
};

export default authDoctor;