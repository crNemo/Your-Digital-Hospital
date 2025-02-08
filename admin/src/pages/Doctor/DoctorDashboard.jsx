import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className='m-3 p-4 bg-gradient-to-br from-gray-50 to-gray-200 shadow-md rounded-xl'>
      <div className='flex flex-wrap gap-4 justify-center'>
        {[{
          icon: assets.earning_icon,
          label: 'Earnings',
          value: `${currency} ${dashData.earnings}`
        }, {
          icon: assets.appointments_icon,
          label: 'Appointments',
          value: dashData.appointments
        }, {
          icon: assets.patients_icon,
          label: 'Patients',
          value: dashData.patients
        }].map((card, index) => (
          <div key={index} className='flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-300 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1'>
            <img className='w-12' src={card.icon} alt='' />
            <div>
              <p className='text-xl font-bold text-gray-900'>{card.value}</p>
              <p className='text-gray-500 text-sm'>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white mt-6 rounded-xl shadow-md overflow-hidden border border-gray-300'>
        <div className='flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl'>
          <img src={assets.list_icon} alt='' className='w-6' />
          <p className='font-semibold text-lg'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-200'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-4 py-3 gap-4 hover:bg-gray-100 transition' key={index}>
              <img className='rounded-full w-10 border-2 border-gray-400' src={item.userData.image} alt='' />
              <div className='flex-1 text-sm'>
                <p className='text-gray-900 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className='text-red-500 font-medium text-sm'>Cancelled</p>
              ) : (
                <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-105 transition' src={assets.cancel_icon} alt='' />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
