import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const presetNotifications = [
  "🚨 Urgent: Bishesh needs AB+ blood at KMC Hospital, Kathmandu",
  "💉 Polio Vaccination Camp on 15th February - Ward-31",
  "🏥 Free Health Checkup at Maitighar for 80+ age group",
  "🦠 COVID-19 Booster Dose available at major health centers",
  "⚠️ Emergency: Road accident at Kalanki - Drive safely!",
  "🦟 Dengue Awareness Program at Lalitpur Community Hall - March 5th"
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
      <div className='md:w-1/2 flex flex-col justify-center gap-4 py-6 md:py-10 lg:py-16 text-left'>
        <p className='text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight drop-shadow-lg'>
          Stay Informed, <br className='hidden md:block' /> Stay Healthy!
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt='Group Profiles' />
          <p className='text-lg font-medium opacity-90'>YDH is your trusted health partner.</p>
        </div>
        <NavLink to='/create' onClick={() => window.scrollTo(0, 0)}>
          <button className='flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 px-8 py-3 rounded-full text-white text-lg font-bold shadow-lg hover:scale-110 transition-all duration-300'>
            🚑 ASK FOR HELP!
          </button>
        </NavLink>
      </div>

      {/* Right side - Futuristic Notifications Carousel */}
      <div className='md:w-1/2 flex justify-center items-center'>
        <div className='relative w-96 h-64 flex flex-col items-center bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden p-6'
          style={{ background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))" }}>
          
          <h2 className='text-2xl font-bold text-white text-center mb-4 drop-shadow-lg'>🔔 Live Alerts</h2>

          <div className='relative w-full h-40 flex items-center justify-center overflow-hidden'>
            {presetNotifications.map((notification, i) => (
              <div 
                key={i} 
                className={`absolute w-11/12 text-center text-white text-lg font-semibold p-4 bg-black/40 backdrop-blur-xl shadow-lg rounded-lg transition-all duration-700 ease-in-out`}
                style={{ 
                  transform: `translateY(${(i - index) * 110}%) scale(${i === index ? 1.05 : 0.9})`,
                  opacity: i === index ? 1 : 0.5,
                  transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
                }}
              >
                {notification}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-4 w-5/6 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-3000"
              style={{ width: `${(index + 1) / presetNotifications.length * 100}%` }}
            ></div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Header;
