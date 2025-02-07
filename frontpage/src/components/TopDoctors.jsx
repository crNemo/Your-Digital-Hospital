import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from "../assets/assets";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors, calculateRating, loading } = useContext(AppContext);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-lg font-bold text-gray-700">Loading...</div>;
    }

    if (!doctors || !calculateRating) {
        return <div className="flex justify-center items-center min-h-screen text-lg font-bold text-gray-700">No doctors available</div>;
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-900 p-6'>
            
            <div className='flex flex-col items-center gap-6 py-16'>
                <h1 className='text-4xl font-semibold text-center text-gray-900'>Top Doctors to Book</h1>
                <p className='w-full sm:w-1/3 text-center text-sm text-gray-600'>Simply browse through our extensive list of trusted doctors and book an appointment hassle-free.</p>
                
                {/* Doctors List */}
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5'>
                    {doctors.slice(0, 9).map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                scrollTo(0, 0);
                            }}
                            className="relative p-6 border border-gray-200 rounded-xl shadow-xl bg-white hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                        >

                            {/* Floating Soft Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 opacity-20 blur-lg rounded-xl"></div>

                            {/* Image Section */}
                            <img className="bg-blue-50 rounded-xl w-full h-60 object-cover" src={item.image} alt={item.name} /> {/* Adjusted height */}

                            {/* Content */}
                            <div className="relative z-10 p-4 text-center">
                                <p className="text-green-500 text-sm font-medium flex items-center justify-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Available
                                </p>
                                <h2 className="text-lg font-semibold text-gray-900 mt-2">{item.name}</h2>
                                <p className="text-gray-600 text-sm">{item.speciality}</p>
                            </div>

                            {/* ⭐ Ratings Section */}
                            <div className="relative z-10 flex items-center justify-center gap-2 mt-2">
                                <p className="text-gray-900 font-semibold">
                                    {item.reviews && item.reviews.length > 0 ? calculateRating(item) : 'No Rating'}
                                </p>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <img
                                            key={i}
                                            src={i < Math.floor(calculateRating(item)) ? assets.star : assets.star_blank}
                                            alt='star'
                                            className="w-4 h-4"
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm">({item.reviews ? item.reviews.length : 0})</p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TopDoctors;
