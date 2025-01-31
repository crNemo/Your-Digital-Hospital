import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from "../assets/assets";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors, calculateRating, loading } = useContext(AppContext);

    console.log("TopDoctors component rendered");
    console.log("Doctors data:", doctors);
    console.log("Loading state:", loading);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!doctors || !calculateRating) {
        return <div>No doctors available</div>;
    }

    return (
        <div className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            scrollTo(0, 0);
                        }}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        key={index}
                    >
                        <img className='bg-blue-50' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                        <div className="flex items-center space-x-2 pl-4">
                            <p>{item && item.reviews && Array.isArray(item.reviews) && item.reviews.length > 0 ? calculateRating(item) : 'No Rating'}</p>
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <img
                                        key={i}
                                        src={i < Math.floor(calculateRating(item)) ? assets.star : assets.star_blank}
                                        alt='star'
                                        className="w-3.5 h-3.5"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600">({item.reviews ? item.reviews.length : 0})</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopDoctors;