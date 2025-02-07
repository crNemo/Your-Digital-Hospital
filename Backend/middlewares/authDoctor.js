import jwt from 'jsonwebtoken';
import Doctor from '../models/doctorModel.js';

const authDoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        const dtoken = authHeader.split(' ')[1];
        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        console.log('Token:', dtoken);

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        console.log('Decoded Token:', token_decode);

        const doctor = await Doctor.findById(token_decode.id).select('-password');
        if (!doctor) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        req.doctor = doctor;
        next();
    } catch (error) {
        console.log('Error in authDoctor middleware:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
        }
        res.status(401).json({ success: false, message: "Invalid Token, Login Again" });
    }
};

export default authDoctor;