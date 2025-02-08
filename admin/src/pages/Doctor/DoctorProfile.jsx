import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import socketIOClient from "socket.io-client";
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { CSSTransition } from 'react-transition-group'; // Import transition wrapper

const DoctorProfile = () => {
  const { backendUrl, dToken, appointments, getAppointments } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const [calling, setCalling] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    getAppointments();
  }, [dToken, getAppointments]);

  useEffect(() => {
    const newSocket = socketIOClient(backendUrl);
    setSocket(newSocket);
    newSocket.on('user-joined-call', (data) => {
      toast.success(`Patient joined video call for ${data.roomName}!`, { duration: 5000 });
    });
    return () => newSocket.disconnect();
  }, [backendUrl]);

  const startCall = async (appointment) => {
    if (appointment.cancelled) {
      toast.error("Cannot start a call for a cancelled appointment.");
      return;
    }
    setCalling(true);
    try {
      const response = await axios.get(`${backendUrl}/api/jitsi/room-name`);
      setRoomName(response.data.roomName);
      socket.emit('call-user', {
        userToCall: appointment.userId,
        from: appointment.docId,
        name: appointment.docData.name,
        roomName: response.data.roomName,
      });
    } catch (error) {
      toast.error("Failed to start video call. Please try again.");
      setCalling(false);
    }
  };

  return (
    <CSSTransition in={true} timeout={300} classNames="page" unmountOnExit>
      <div className="w-full h-screen flex flex-col bg-gray-50 p-4"> {/* Light background */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full h-full overflow-y-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Doctor Profile</h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
            
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg shadow-lg p-4">
              {appointments.slice().reverse().map((appointment, index) => (
                <div key={appointment._id} className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-50 rounded-lg transform transition-all hover:scale-105">
                  <div className="flex items-center gap-3">
                    <img className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-md" src={appointment.userData.image || assets.user_icon} alt="User" />
                    <p className="text-gray-700 font-medium">{appointment.userData.name} - {slotDateFormat(appointment.slotDate)} - {appointment.slotTime}</p>
                  </div>
                  {!appointment.cancelled ? (
                    <button
                      onClick={() => startCall(appointment)}
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-green-500"
                      disabled={calling}
                    >
                      {calling ? 'Calling...' : 'Call Patient'}
                    </button>
                  ) : (
                    <span className="text-red-500 font-semibold">Cancelled</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {calling && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Video Call</h3>
              <div className="w-full h-[80vh] flex justify-center items-center bg-black rounded-lg shadow-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://meet.jit.si/${roomName}`}
                  allow="camera; microphone; fullscreen; display-capture"
                  title="Jitsi Meet"
                />
              </div>
            </div>
          )}
          
          <Toaster />
        </div>
      </div>
    </CSSTransition>
  );
};

export default DoctorProfile;
