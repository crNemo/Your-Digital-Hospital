import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Bed = () => {
    const { speciality } = useParams();
    const [filterBed, setFilterBed] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const { loading, beds, calculateRating } = useContext(AppContext);
    const navigate = useNavigate();

    const applyFilter = () => {
        if (speciality) {
            const filtered = beds.filter(bed => {
                console.log(`Checking bed: ${bed.name}, Speciality: ${bed.speciality}`);
                return bed.speciality.toLowerCase() === speciality.toLowerCase();
            });
            setFilterBed(filtered);
        } else {
            setFilterBed(beds);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [beds, speciality]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p className='text-gray-600'>Browse through our beds specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <button
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    Filters
                </button>
                <div className={`flex-col gap-4 text-sm text-grey-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    <p
                        onClick={() => speciality === 'General' ? navigate('/bed') : navigate('/bed/General')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General" ? "bg-indigo-100 text-black" : ""}`}
                    >
                        General
                    </p>
                    <p
                        onClick={() => speciality === 'ICU' ? navigate('/bed') : navigate('/bed/ICU')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "ICU" ? "bg-indigo-100 text-black" : ""}`}
                    >
                        ICU
                    </p>
                    <p
                        onClick={() => speciality === 'Surgical' ? navigate('/bed') : navigate('/bed/Surgical')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Surgical" ? "bg-indigo-100 text-black" : ""}`}
                    >
                        Surgical
                    </p>
                    <p
                        onClick={() => speciality === 'Pediatric' ? navigate('/bed') : navigate('/bed/Pediatric')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatric" ? "bg-indigo-100 text-black" : ""}`}
                    >
                        Pediatric
                    </p>
                </div>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 gap-y-6'>  {/*Adjusted Grid to be like the picture*//* Added fixed height, adjusted width for two columns */}
                     {filterBed.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/bed-appointment/${item._id}`)}
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-full h-72'
                        >
                            <img className='bg-blue-50 h-32 w-full object-cover' src={item.image} alt={item.name} />
                            <div className='p-4'>
                                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                    <p>Available</p>
                                </div>
                                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-700 text-sm font-medium'>{item.details}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                            {/* Rating Section */}
                            <div className="flex items-center justify-between pl-4 pr-2">
                                <p>
                                    {calculateRating(item) > 0
                                        ? calculateRating(item).toFixed(1)
                                        : 'No Ratings'}
                                </p>
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <img
                                            key={i}
                                            src={i < Math.floor((calculateRating(item) || 0)) ? assets.star : assets.star_blank}
                                            alt='star'
                                            className="w-3.5 h-3.5"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bed;