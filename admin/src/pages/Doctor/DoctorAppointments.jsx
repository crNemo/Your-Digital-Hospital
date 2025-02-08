import React, { useEffect, useContext, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const [appointmentStatus, setAppointmentStatus] = useState({});

  const { slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const handleCompleteAppointment = (appointmentId) => {
    toast.success('Appointment Completed Successfully');
    setAppointmentStatus((prevStatus) => ({
      ...prevStatus,
      [appointmentId]: 'completed',
    }));
  };

  const handleCancelAppointment = (appointmentId) => {
    toast.success('Appointment Canceled Successfully');
    setAppointmentStatus((prevStatus) => ({
      ...prevStatus,
      [appointmentId]: 'canceled',
    }));
  };

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-semibold text-gray-800'>All Appointments</p>
      <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-300'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>DOB</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.slice().reverse().map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-600 px-6 py-4 border-b border-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 rounded-full border-2 border-blue-500 shadow-md' src={item.userData.image || assets.user_icon} alt="" />
              <p className='text-gray-800 font-medium'>{item.userData.name}</p>
            </div>
            <p className='text-xs inline border border-primary px-2 w-12 rounded-full'>
              {item.payment ? 'Online' : 'Cash'}
            </p>
            <p className='max-sm:hidden'>{item.userData.dob}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{item.amount}</p>
            <div className='flex items-center space-x-4'>
              {item.cancelled || appointmentStatus[item._id] === 'canceled' ? (
                <div className='bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold'>
                  Canceled
                </div>
              ) : item.isCompleted || appointmentStatus[item._id] === 'completed' ? (
                <div className='bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold'>
                  Completed
                </div>
              ) : (
                <div className='flex space-x-3'>
                  <img onClick={() => handleCancelAppointment(item._id)} className='w-8 cursor-pointer transition-all hover:scale-110 hover:text-red-500' src={assets.cancel_icon} alt="Cancel" />
                  <img onClick={() => handleCompleteAppointment(item._id)} className='w-8 cursor-pointer transition-all hover:scale-110 hover:text-green-500' src={assets.tick_icon} alt="Complete" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
