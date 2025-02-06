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
            const { data } = await axios.post(backendUrl + '/api/user/book-bed', { bedId, bookingDate, bookingTime }, { headers: { Authorization: `Bearer ${token}` } });
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

    if (!bedInfo) {
        return <div>Loading bed information...</div>;
    }

    return (
        <div>
            {/* Bed Details */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={bedInfo.image} alt={bedInfo.name} />
                </div>

                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {bedInfo.name}
                    </p>
                  {bedInfo.details && ( //Make the new hospital name show  or display anything since it may be undefined
                      <p className='text-gray-600 text-sm'>{bedInfo.details}</p>
                  )}
                    <p className='text-gray-600 text-sm'>{bedInfo.speciality}</p>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About</p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{bedInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>
                        Fee: <span className='text-gray-600'>{bedInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* Booking Section */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Book a Bed</p>

                {/* Date and Time Selection */}
                <div className='mt-4'>
                    <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">Select Date:</label>
                    <input
                        type="date"
                        id="bookingDate"
                        className="mt-1 p-2 border rounded-md w-full max-w-xs"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                    />
                </div>

                <div className='mt-4'>
                    <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700">Select Time:</label>
                    <input
                        type="time"
                        id="bookingTime"
                        className="mt-1 p-2 border rounded-md w-full max-w-xs"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                    />
                </div>

                {/* Booking Button */}
                <button onClick={handleBookBed} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>
                    Book Bed
                </button>
            </div>
        </div>
    );
};

export default BedAppointment;