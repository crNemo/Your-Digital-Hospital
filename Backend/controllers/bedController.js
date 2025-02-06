import bedModel from "../models/bedModel.js";
import { v2 as cloudinary } from 'cloudinary';

const addBed = async (req, res) => {
    try {
        const { name, details, speciality, about, fees, address, contact } = req.body;
        const imageFile = req.file;

        if (!name || !details || !speciality || !about || !fees || !address || !contact) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        let imageUrl = ''; // Initialize imageUrl

        try {
            const uploadResult = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            imageUrl = uploadResult.secure_url;
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return res.status(500).json({ success: false, message: 'Failed to upload image to Cloudinary.' });
        }

        const bedData = {
            name,
            details,
            image: imageUrl,
            speciality,
            about,
            fees,
            address,
            contact,
            date: Date.now()
        };

        const newBed = new bedModel(bedData);
        await newBed.save();

        res.json({ success: true, message: "Bed Added Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const changeAvailability = async (req, res) => {
    try {
        const { bedId } = req.body;

        const bedData = await bedModel.findById(bedId);
        if (!bedData) {
            return res.status(404).json({ success: false, message: 'Bed not found' });
        }

        await bedModel.findByIdAndUpdate(bedId, { available: !bedData.available });
        res.json({ success: true, message: 'Availability Changed' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const bedList = async (req, res) => {
    try {
        const beds = await bedModel.find({});
        res.json({ success: true, beds });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { changeAvailability, bedList, addBed };