import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const BedAppointment = () => {
    const { bedId } = useParams();
    const { beds, backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    const [bedInfo, setBedInfo] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);

    useEffect(() => {
        const fetchBedInfo = async () => {
            const foundBed = beds.find(bed => bed._id === bedId);
            if (foundBed) {
                setBedInfo(foundBed);
            } else {
                toast.error("Bed not found!");
                navigate('/bed'); // Redirect to bed listing page
            }
        };
        if (beds.length) {
            fetchBedInfo();
        }
    }, [bedId, beds, navigate]);

    const getAvailableSlots = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-bed-slots/${bedId}`);
            setAvailableSlots(data.slots || []);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch available slots');
        }
    };

    const handleBookBed = async () => {
        if (!token) {
            toast.warn('Login to book bed');
            return navigate('/login');
        }

        if (!bookingDate || !bookingTime) {
            toast.error('Please select a date and time');
            return;
        }

        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/book-bed',
                { bedId, bookingDate, bookingTime },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.success) {
                toast.success(data.message);
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'An error occurred');
        }
    };

    useEffect(() => {
        if (bedInfo) {
            getAvailableSlots();
        }
    }, [bedInfo]);

    if (!bedInfo) {
        return <div>Loading bed information...</div>;
    }

    return (
        <div className="bg-gradient-to-r from-purple-100 via-indigo-100 to-pink-100 min-h-screen p-6 sm:p-12">
            <div className="flex flex-col gap-6 sm:gap-12">

                {/* Bed Details */}
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
                    <img className="w-full max-w-xs rounded-lg mx-auto" src={bedInfo.image} alt={bedInfo.name} />
                    <p className="text-2xl font-semibold mt-4 text-center text-gray-900">{bedInfo.name}</p>
                    <p className="text-sm text-gray-600 text-center">{bedInfo.speciality}</p>

                    {/* About Bed */}
                    <div className="mt-4 text-center">
                        <p className="text-lg font-semibold text-gray-700">About</p>
                        <p className="text-sm text-gray-500 mt-2 max-w-[500px] mx-auto">{bedInfo.about}</p>
                    </div>

                    <p className="text-lg font-bold mt-6 text-center text-gray-900">Fee: {bedInfo.fees}</p>
                </div>

                {/* Booking Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
                    <p className="text-xl font-semibold text-gray-700">Book a Bed</p>

                    {/* Date Selection */}
                    <div className="mt-4">
                        <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">Select Date:</label>
                        <input
                            type="date"
                            id="bookingDate"
                            className="mt-1 p-2 border rounded-md w-full max-w-xs"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                        />
                    </div>

                    {/* Available Slots */}
                    <div className="flex gap-4 mt-6 overflow-x-scroll pb-4">
                        {availableSlots.length && availableSlots.map((slot, index) => (
                            <div
                                key={index}
                                onClick={() => setSlotIndex(index)}
                                className={`text-center py-6 px-8 min-w-32 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 ${slotIndex === index ? 'bg-primary text-white' : 'bg-gray-100 border border-gray-300'}`}
                            >
                                <p className="text-sm font-semibold text-gray-600">{slot}</p>
                            </div>
                        ))}
                    </div>

                    {/* Time Selection */}
                    <div className="flex gap-3 overflow-x-scroll mt-4">
                        {availableSlots.length && availableSlots[slotIndex] && availableSlots[slotIndex].map((time, index) => (
                            <p
                                key={index}
                                onClick={() => setBookingTime(time)}
                                className={`text-sm font-light py-2 px-5 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${time === bookingTime ? 'bg-primary text-white' : 'border border-gray-300 text-gray-400 hover:bg-gray-100'}`}
                            >
                                {time.toLowerCase()}
                            </p>
                        ))}
                    </div>

                    {/* Book Button */}
                    <button
                        onClick={handleBookBed}
                        className="mt-8 w-full bg-primary text-white py-3 rounded-full transition-all duration-300 hover:scale-105"
                    >
                        Book Bed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BedAppointment;
