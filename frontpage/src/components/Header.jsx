import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';// Ensure this import is correct

const notifications = [
  { text: "Urgent: Bishesh is in urgent need of AB+ blood type at KMC Hospital,Sinamangal Kathmandu", color: "bg-red-500" },
  { text: "Polio Vaccination Camp on 15th Febuarary in Kathmandu Metropolitian City Ward-31", color: "bg-blue-500" },
  { text: "Free Health-Checkup at Maitighar for people over 80 years", color: "bg-green-500" },
];

const Header = () => {

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 md:w-[60vw] md:h-[85vh]'>
      {/* Left side */}
      <div className='md:w-1/2 flex flex-col justify-center gap-4 py- m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibond leding-tight md:leading-tight lg:leading-tight'>
          Book Appointments <br className='hidden:block' /> with Trusted Doctors!
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt="Group Profiles" />
          <p>Schedule your appointments and keep your health in check!</p>
        </div>
        <NavLink to='/create' onClick={()=>scrollTo(0,0)}>
          <a className='flex items-center gap-2 bg-white px-8 py-5 rounded-full text-[#f71928] text-lg font-semibd p-4 m-auto md:m-0 hover:scale-105 transition-all duration-300 '>
            Ask For HELP <img className='w-3' src={assets.arrow_icon} alt="Arrow Icon" /></a>
        </NavLink>
      </div>
      {/* Right side */}
      {/* <div className='md:w-1/2 flex flex-col justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <div className="flex flex-col items-center justify-center p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Important Notifications</h2>
          <div className="relative w-full h-40 flex items-center justify-center">
            <div className={`w-full h-32 flex items-center justify-center text-white text-lg font-semibd p-4 rounded-xl shadow-lg transition-all duration-500 ${notifications[index].color}`}>
              {notifications[index].text}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Header;