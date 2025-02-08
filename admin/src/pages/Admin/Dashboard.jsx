import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="m-5">

      <div className="flex flex-wrap gap-4">
        {/* Card for Doctors */}
        <div className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-md border hover:scale-105 transition-transform duration-300 ease-in-out">
          <img className="w-16 h-16" src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.doctors}</p>
            <p className="text-gray-500">Doctors</p>
          </div>
        </div>

        {/* Card for Appointments */}
        <div className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-md border hover:scale-105 transition-transform duration-300 ease-in-out">
          <img className="w-16 h-16" src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.appointments}</p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        {/* Card for Patients */}
        <div className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-md border hover:scale-105 transition-transform duration-300 ease-in-out">
          <img className="w-16 h-16" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.patients}</p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white mt-10 rounded-lg shadow-md">
        <div className="flex items-center gap-2.5 px-6 py-4 rounded-t border-b border-gray-200 bg-gray-50">
          <img src={assets.list_icon} alt="List" />
          <p className="font-semibold text-gray-800">Latest Bookings</p>
        </div>

        <div className="pt-4 border-t-0">
          {
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center px-6 py-4 gap-4 hover:bg-gray-100 transition-all duration-200 ease-in-out">
                <img className="rounded-full w-12 h-12" src={item.docData.image} alt="Doctor" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-semibold">{item.docData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled
                  ? <p className="text-red-500 text-xs font-medium">Cancelled</p>
                  : <img onClick={() => cancelAppointment(item._id)} className="w-8 cursor-pointer hover:scale-110 transition-all" src={assets.cancel_icon} alt="Cancel" />
                }
              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
