import { createContext, useState, useCallback } from 'react';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors] = useState([])
    const [beds, setBeds] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = useCallback(async () => {
        try {
            const {data} = await axios.post(backendUrl+ '/api/admin/all-doctors',{},{headers:{aToken}})
            if (data.success) {
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    },[aToken, backendUrl]);

    const changeDoctorAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-doctor-availability',{docId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllBeds = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/beds/list', { headers: { aToken } });
            if (data.success) {
                setBeds(data.beds);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [aToken, backendUrl]);

    const changeBedAvailability = async (bedId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/beds/change-availability',{bedId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllBeds()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken,setAToken,
        backendUrl,doctors,
        getAllDoctors, changeDoctorAvailability,
        beds, setBeds,
        getAllBeds, changeBedAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider