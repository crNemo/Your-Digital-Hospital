import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-2xl font-semibold text-gray-900 tracking-wide'>All Appointments</p>

      <div className='bg-gradient-to-r from-indigo-50 via-purple-100 to-indigo-50 rounded-lg shadow-xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-4 px-6 bg-gray-100 border-b border-gray-200 rounded-t-lg'>
          <p className='font-medium text-gray-600 tracking-wide'>#</p>
          <p className='font-medium text-gray-600 tracking-wide'>Patient</p>
          <p className='font-medium text-gray-600 tracking-wide'>Age</p>
          <p className='font-medium text-gray-600 tracking-wide'>Date & Time</p>
          <p className='font-medium text-gray-600 tracking-wide'>Doctor</p>
          <p className='font-medium text-gray-600 tracking-wide'>Fee</p>
          <p className='font-medium text-gray-600 tracking-wide'>Actions</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-100 transition-all ease-in-out rounded-lg shadow-sm hover:shadow-xl' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-3'>
              <img className='w-12 h-12 rounded-full transition-transform transform hover:scale-110' src={item.userData.image} alt="Patient" />
              <p className='text-gray-900 font-medium'>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p className='text-gray-800'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-3'>
              <img className='w-12 h-12 rounded-full bg-gray-200 transition-transform transform hover:scale-110' src={item.docData.image} alt="Doctor" />
              <p className='text-gray-800 font-medium'>{item.docData.name}</p>
            </div>
            <p className='font-semibold text-gray-800'>{currency}{item.amount}</p>

            {/* Actions */}
            {item.cancelled
              ? <p className='text-red-500 font-medium text-xs animate-pulse'>Cancelled</p>
              : <img 
                  onClick={() => cancelAppointment(item._id)} 
                  className='w-10 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' 
                  src={assets.cancel_icon} 
                  alt="Cancel" 
                />
            }
          </div>
        ))}

      </div>
    </div>
  )
}

export default AllAppointments
