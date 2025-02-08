import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import socketIOClient from "socket.io-client";

const MyAppointment = () => {
    const { backendUrl, token, userData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [calling, setCalling] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [socket, setSocket] = useState(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const months = [' ', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    };

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { Authorization: `Bearer ${token}` } });

            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const startCall = async (appointment) => {
        if (appointment.cancelled) {
            toast.error("Cannot start a call for a cancelled appointment.");
            return;
        }

        setCalling(true);
        try {
            // Fetch Jitsi Meet room name from the backend
            const response = await axios.get(`${backendUrl}/api/jitsi/room-name`);
            setRoomName(response.data.roomName);

        } catch (error) {
            console.error("Error getting room name:", error);
            toast.error("Failed to start video call. Please try again.");
            setCalling(false);
            return;
        }
    };
      const handleJitsiIframeLoad = () => {
        // Emit an event to the server when the user joins the Jitsi Meet call
        socket.emit('user-joined', { roomName: roomName, from: userData._id });
        console.log("Emitted user joined event for room", roomName);
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    useEffect(() => {
        const ENDPOINT = backendUrl
        const newSocket = socketIOClient(ENDPOINT);
        setSocket(newSocket);

        newSocket.on('incoming-call', (data) => {
            console.log("Incoming call from", data.from);
            setReceivingCall(true);
            setCaller(data.from);
            toast((t) => (
                <span>
                    Incoming call from {data.name} ({data.from})!
                    <button onClick={() => { acceptCall(data); toast.dismiss(t.id); }}>Accept</button>
                    <button onClick={() => toast.dismiss(t.id)}>Reject</button>
                </span>
            ));
        });

        return () => newSocket.disconnect();
    }, [userData, backendUrl]);

    const acceptCall = async (data) => {
        setReceivingCall(false);

    }
    console.log('userData._id', userData._id)
    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
            <div>
                {appointments.map((item, index) => (
                    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                        <div>
                            <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Address</p>
                            <p className='text-xs'>{item.docData.address.line1}</p>
                            <p className='text-xs'>{item.docData.address.line2}</p>
                            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end'>
                            {!item.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300s'>Pay Online</button>}
                            {!item.cancelled &&
                                <button
                                    onClick={() => startCall(item)}
                                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-green-600 hover:text-white transition-all duration-300s'
                                    disabled={calling}
                                >
                                    {calling ? 'Calling...' : 'Call Doctor'}
                                </button>
                            }
                            {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300s'>Cancel Appointment</button>}
                            {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>
           {calling && (
                <iframe
                className='w-full h-[80vh] rounded-lg shadow'  // Adjust size as needed
                    src={`https://meet.jit.si/${roomName}`}   // Use public Jitsi Meet server
                    allow="camera; microphone; fullscreen; display-capture"
                    onLoad={handleJitsiIframeLoad}
                    />
            )}
        </div>
    );
};

export default MyAppointment;