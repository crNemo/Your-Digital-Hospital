import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    return (
        <div className="min-h-screen bg-white shadow-md p-4 rounded-r-xl">
            {/* Admin Sidebar */}
            {aToken && (
                <ul className='text-gray-700 mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" className="w-6" />
                        <p className='font-semibold'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" className="w-6" />
                        <p className='font-semibold'>Appointments</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/add-doctors'}>
                        <img src={assets.add_icon} alt="" className="w-6" />
                        <p className='font-semibold'>Add Doctor</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/doctor-list'}>
                        <img src={assets.people_icon} alt="" className="w-6" />
                        <p className='font-semibold'>Doctors List</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/add-beds'}>
                        <img src={assets.add_icon} alt="" className="w-6" />
                        <p className='font-semibold'>Add Bed</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/bed-list'}>
                        <img src={assets.people_icon} alt="" className="w-6" />
                        <p className='font-semibold'>Bed List</p>
                    </NavLink>
                </ul>
            )}

            {/* Doctor Sidebar */}
            {dToken && (
                <ul className='text-gray-700 mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/doctor-dashboard'}>
                        <img src={assets.home_icon} alt="" className="w-6" />
                        <p className='hidden md:block font-semibold'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/doctor-appointments'}>
                        <img src={assets.appointment_icon} alt="" className="w-6" />
                        <p className='hidden md:block font-semibold'>Appointments</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-4 py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'bg-[#E8F4FF] text-blue-700 rounded-xl shadow-md' : 'hover:bg-[#E8F4FF] hover:text-blue-700 rounded-xl'}`} to={'/doctor-profile'}>
                        <img src={assets.people_icon} alt="" className="w-6" />
                        <p className='hidden md:block font-semibold'>Call Patient</p>
                    </NavLink>
                </ul>
            )}
        </div>
    )
}

export default Sidebar
