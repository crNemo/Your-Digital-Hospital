import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true }, //This will now save the link to the image
    speciality: { type: String, required: true },
    about: { type: String, required: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    contact: { type: String, required: true },
    available: { type: Boolean, default: true },
    date: { type: Number, required: true }
}, { minimize: false });

const bedModel = mongoose.model('bed', bedSchema);

export default bedModel;