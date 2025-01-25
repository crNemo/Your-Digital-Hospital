import React from 'react';
import { assets } from '../assets/assets'; // Ensure this import is correct

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
            {/* Left side */}
            <div className='md:w-1/2 flex flex-col justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibond leding-tight md:leading-tight lg:leading-tight'>
                    Book Appointments <br className='hidden:block' /> with Trusted Doctors!
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="Group Profiles" />
                    <p >Schedule your appointments and keep your health in check!</p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-5 rounded-full text-grey-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 '>
                    Book Appointment<img className='w-3' src={assets.arrow_icon} alt="Arrow Icon" /></a>
            </div>
            {/* Right side */}
            <div className='md:w-1/2 relative'>
                <ul className='flex flex-col md:flex-row flex-wrap gap-4 md:gap-8 lg:gap-12 py-10 m-auto md:py-[10vw]'>
                    <li className='text-2xl md:text-3xl lg:text-4xl text-[#384061] font-semibond leding-tight md:leading-tight lg:leading-tight'>Donate Blood Save Lives</li>
                    <li className='text-2xl md:text-3xl lg:text-4xl text-[#4a5582] font-semibond leding-tight md:leading-tight lg:leading-tight'>Emergency Ambulences</li>
                    <li className='text-2xl md:text-3xl lg:text-4xl text-[#606ea8] font-semibond leding-tight md:leading-tight lg:leading-tight'>Systematic Appointments</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;