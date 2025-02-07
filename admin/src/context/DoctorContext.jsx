import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || null);
    const [appointments, setAppointments] = useState([]);

    const[dashData, setDashData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (dToken) {
            localStorage.setItem('dToken', dToken);
        } else {
            localStorage.removeItem('dToken');
        }
    }, [dToken]);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
                headers: { Authorization: `Bearer ${dToken}` }
            });
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error(error.message);
        }
    };

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, {
                headers: { Authorization: `Bearer ${dToken}` }
            });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error completing appointment:', error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, {
                headers: { Authorization: `Bearer ${dToken}` }
            });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error canceling appointment:', error);
            toast.error(error.message);
        }
    };

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
                headers: { Authorization: `Bearer ${dToken}` }
            });
            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error(error.message);
        }
    };
    const getStreamVideoDoctorToken = async (doctorId) => {
        try {
          const response = await axios.get(`${backendUrl}/api/stream-video/doctor-token?doctorId=${doctorId}`);
          return response.data.token;
        } catch (error) {
          console.error('Error fetching Stream Video token:', error);
          toast.error('Failed to fetch Stream Video token');
          return null;
        }
      };
    const value = {
        dToken, setDToken,
        backendUrl,
        appointments, setAppointments,
        getAppointments,
        completeAppointment, cancelAppointment,
        getStreamVideoDoctorToken,

        dashData,setDashData,getDashData,
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;