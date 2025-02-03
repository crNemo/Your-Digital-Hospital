import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
            {/* ----- Left Section----- */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>YDH is a solution to all the health problems you have been facing in Nepal. Doctor Appointment booking system with proper pricing, Bed Availability Check and Price Checking, Emergency Blood Donation System, Emergency Ambulance Calling.</p>
            </div>
            {/* ----- Center Section----- */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/* ----- Right Section----- */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+977-9866600640</li>
                    <li>gautambishesh100@gmail.com</li>
                    <li>bibashthapa0707@gmail.com</li>
                    <li>an.angel.neupane@gmail.com</li>
                </ul>
            </div>
        </div>
        
        {/* ----- Copyright Text ----- */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025 @ YDH.dev - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer