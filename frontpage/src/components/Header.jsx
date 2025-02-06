import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const presetNotifications = [
  "Urgent: Bishesh is in urgent need of AB+ blood type at KMC Hospital, Sinamangal, Kathmandu",
  "Polio Vaccination Camp on 15th February in Kathmandu Metropolitan City Ward-31",
  "Free Health-Checkup at Maitighar for people over 80 years",
  "COVID-19 Booster Dose available at all major health centers in Kathmandu",
  "Emergency Alert: Road accident reported at Kalanki. Drive safely!",
  "Dengue Awareness Program at Lalitpur Community Hall on March 5th"
];

const Header = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (presetNotifications.length > 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % presetNotifications.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className='flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 md:w-[80vw] md:h-[75vh] relative'>
      {/* Left side */}
      <div className='md:w-1/2 flex flex-col justify-center gap-2 py-6 md:py-10 lg:py-16 text-left'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
          Keep Your Health <br className='hidden md:block' /> In Check Today
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt='Group Profiles' />
          <p>YDH is the solution to all your health problems!</p>
        </div>
        <NavLink to='/create' onClick={() => window.scrollTo(0, 0)}>
          <button className='flex items-center gap-2 bg-[#f71928] px-8 py-3 rounded-full text-white text-lg font-semibold hover:scale-105 transition-all duration-300'>
            ASK FOR HELP! 
          </button>
        </NavLink>
      </div>
      {/* Right side - Notifications Carousel */}
      <div className='md:w-1/2 flex justify-center items-center'>
        <div className='bg-gray-200 rounded-lg p-6 shadow-lg w-96 h-60 flex flex-col items-center relative overflow-hidden'>
          <h2 className='text-lg font-bold text-gray-900 text-center mb-4'>Important Information</h2>
          <div className='relative w-full h-40 flex flex-col items-center overflow-hidden'>
            {presetNotifications.map((notification, i) => (
              <div 
                key={i} 
                className={`absolute w-full text-center text-black text-lg font-semibold p-4 bg-white shadow-md rounded-lg flex items-center justify-center transition-transform duration-500`} 
                style={{ 
                  transform: `translateY(${(i - index) * 120}%)`,
                  opacity: i === index ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
                }}
              >
                {notification}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
