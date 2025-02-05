import express from 'express';
import { changeAvailability, bedList, addBed } from '../controllers/bedController.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';

const bedRouter = express.Router();

// Admin-only routes
bedRouter.post('/admin/change-availability', authAdmin, changeAvailability); // Admin only
bedRouter.post('/admin/add-bed', authAdmin, upload.single('image'), addBed);  // Admin only

// Public route for listing beds
bedRouter.get('/list', bedList); // No authAdmin here; publicly accessible

export default bedRouter;