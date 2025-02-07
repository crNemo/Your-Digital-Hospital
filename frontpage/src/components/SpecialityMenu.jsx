import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-gray-800" id="speciality">
      <h1 className="text-4xl font-semibold text-gray-900 tracking-wide">
        Find by Speciality
      </h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Browse our extensive list of trusted doctors and schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-6 pt-6 w-full overflow-x-auto scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="group flex flex-col items-center text-xs cursor-pointer flex-shrink-0 transition-transform transform hover:-translate-y-2 duration-300"
          >
            {/* Neon Glow Effect */}
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:scale-105 hover:shadow-xl">
              <img
                className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-110"
                src={item.image}
                alt={item.speciality}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-20 blur-sm"></div>
            </div>
            {/* Speciality Name */}
            <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-indigo-500 transition-colors">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
