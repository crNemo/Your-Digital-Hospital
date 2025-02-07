import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import socketIOClient from "socket.io-client";
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

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
    <div className="w-full h-screen flex flex-col bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full h-full overflow-y-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Doctor Profile</h2>
        <div>
          <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {appointments.slice().reverse().map((appointment, index) => (
              <div key={appointment._id} className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full" src={appointment.userData.image || assets.user_icon} alt="User" />
                  <p className="text-gray-700">{appointment.userData.name} - {slotDateFormat(appointment.slotDate)} - {appointment.slotTime}</p>
                </div>
                {!appointment.cancelled ? (
                  <button
                    onClick={() => startCall(appointment)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
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
            <h3 className="text-lg font-semibold mb-2">Video Call</h3>
            <iframe
              className="w-full h-[80vh] rounded-lg shadow"
              src={`https://meet.jit.si/${roomName}`}
              allow="camera; microphone; fullscreen; display-capture"
              title="Jitsi Meet"
            />
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default DoctorProfile;