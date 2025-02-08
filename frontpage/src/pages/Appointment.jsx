import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import toast from 'react-hot-toast';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    if (docInfo) {
      setDocInfo(docInfo);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDay() === currentDate.getDay()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const isSlotAvailable = !docInfo.slots_booked[slotDate] || !docInfo.slots_booked[slotDate].includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error('Login to book appointment');
      navigate('/login');
      window.scrollTo(0, 0);
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return docInfo && (
    <div className="bg-gradient-to-r from-purple-100 via-indigo-100 to-pink-100 min-h-screen p-6 sm:p-12">
      <div className="flex flex-col gap-6 sm:gap-12">

        {/* Doctor Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
          <img className="w-full max-w-xs rounded-lg mx-auto" src={docInfo.image} alt="Doctor" />
          <p className="text-2xl font-semibold mt-4 text-center text-gray-900">{docInfo.name}</p>
          <p className="text-sm text-gray-600 text-center">{docInfo.degree} - {docInfo.speciality}</p>

          {/* About Doctor */}
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-700">About</p>
            <p className="text-sm text-gray-500 mt-2 max-w-[500px] mx-auto">{docInfo.about}</p>
          </div>

          <p className="text-lg font-bold mt-6 text-center text-gray-900">Appointment Fee: {currencySymbol}{docInfo.fees}</p>
        </div>

        {/* Appointment Slots */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
          <p className="text-xl font-semibold text-gray-700">Available Slots</p>
          <div className="flex gap-4 mt-6 overflow-x-scroll pb-4">
            {docSlots.length && docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 px-8 min-w-32 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 ${slotIndex === index ? 'bg-primary text-white' : 'bg-gray-100 border border-gray-300'}`}
              >
                <p className="text-sm font-semibold text-gray-600">{daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-lg font-semibold text-gray-800">{item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 overflow-x-scroll mt-4">
            {docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light py-2 px-5 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-300 text-gray-400 hover:bg-gray-100'}`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button
            onClick={bookAppointment}
            className="mt-8 w-full bg-primary text-white py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Book Appointment
          </button>
        </div>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
