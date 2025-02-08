import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Bed = () => {
    const { speciality } = useParams();
    const [filterBed, setFilterBed] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedSpeciality, setSelectedSpeciality] = useState('All');
    const { loading, beds, calculateRating } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedSpeciality !== 'All') {
            const filtered = beds.filter(bed => bed.speciality.toLowerCase() === selectedSpeciality.toLowerCase());
            setFilterBed(filtered);
        } else {
            setFilterBed(beds);
        }
    }, [selectedSpeciality, beds]);

    const handleFilterClick = (speciality) => setSelectedSpeciality(speciality);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-lg font-bold text-gray-700">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-900 p-6">
            <div className="flex justify-center mb-6">
                <button
                    className={`py-2 px-5 rounded-full text-lg font-semibold transition-all sm:hidden shadow-md 
                        ${showFilter ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    🔍 Filters
                </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* 🔹 Sidebar Filters */}
                <div className={`flex-col gap-4 text-sm ${showFilter ? 'flex' : 'hidden sm:flex'} w-full sm:w-auto`}>
                    {["All", "General", "ICU", "Surgical", "Pediatric"].map((type) => (
                        <p
                            key={type}
                            onClick={() => handleFilterClick(type)}
                            className={`w-full sm:w-auto pl-5 py-2 pr-16 border border-gray-300 rounded-lg cursor-pointer transition-all font-medium text-gray-800 hover:bg-blue-500 hover:text-white 
                                ${selectedSpeciality === type ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                            {type}
                        </p>
                    ))}
                </div>

                {/* 🛏️ Beds List */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filterBed.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/bed-appointment/${item._id}`)}
                            className="relative p-6 border border-gray-200 rounded-xl shadow-xl bg-white hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                        >
                            {/* Floating Soft Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 opacity-20 blur-lg rounded-xl"></div>

                            {/* Image Section */}
                            <img className="bg-blue-50 rounded-xl w-full h-32 object-cover" src={item.image} alt={item.name} />

                            {/* Content */}
                            <div className="relative z-10 p-4 text-center">
                                <p className="text-green-500 text-sm font-medium flex items-center justify-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Available
                                </p>
                                <h2 className="text-lg font-semibold text-gray-900 mt-2">{item.name}</h2>
                                <p className="text-gray-600 text-sm">{item.details}</p>
                                <p className="text-gray-500 text-sm">{item.speciality}</p>
                            </div>

                            {/* ⭐ Ratings Section */}
                            <div className="relative z-10 flex items-center justify-between px-4 mt-2">
                                <p className="text-gray-900 font-semibold">
                                    {item.reviews && item.reviews.length > 0 ? calculateRating(item).toFixed(1) : 'No Ratings'}
                                </p>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <img
                                            key={i}
                                            src={i < Math.floor((calculateRating(item) || 0)) ? assets.star : assets.star_blank}
                                            alt='star'
                                            className="w-4 h-4"
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
