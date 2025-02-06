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
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-300'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>DOB</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 px-6 py-4 border-b border-gray-300 hover:bg-gray-100'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className='text-xs inline border border-primary px-2 w-11 rounded-full'>
              {item.payment ? 'Online' : 'Cash'}
            </p>
            <p className='max-sm:hidden'>{item.userData.dob}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{item.amount}</p>
            <div className='flex'>
              {item.cancelled || appointmentStatus[item._id] === 'canceled' ? (
                <div className='border border-red-500 text-red-500 px-4 py-2 rounded'>
                  Canceled
                </div>
              ) : item.isCompleted || appointmentStatus[item._id] === 'completed' ? (
                <div className='border border-green-500 text-green-500 px-4 py-2 rounded'>
                  Completed
                </div>
              ) : (
                <>
                  <img onClick={() => handleCancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                  <img onClick={() => handleCompleteAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="Complete" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;