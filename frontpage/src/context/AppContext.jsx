import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = 'NRs';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);

    const calculateRating = useCallback((item) => {
        if (item && item.reviews && Array.isArray(item.reviews) && item.reviews.length > 0) {
            const totalRating = item.reviews.reduce((acc, review) => acc + review.rating, 0);
            return totalRating / item.reviews.length;
        } else {
            return 0;
        }
    }, []);

    const getDoctorsData = useCallback(async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [backendUrl, token]);

    const loadUserProfileData = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }, [backendUrl, token]);

    const getBedsData = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/beds/list`, {
                headers: {
                    Authorization: `Bearer ${token}` //auth admin will need that token from the admin
                }
            });

            if (data.success) {
                // Ensure that each bed has a reviews array (even if it's empty)
                const bedsWithReviews = data.beds.map(bed => ({
                    ...bed,
                    reviews: bed.reviews || [], // Assign an empty array if reviews is undefined
                }));
                setBeds(bedsWithReviews);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false); // Ensure loading is always set to false
        }
    }, [backendUrl, token]);

    // const getStreamVideoUserToken = async (userId) => {
    //     try {
    //       const response = await axios.get(`${backendUrl}/api/stream-video/user-token?userId=${userId}`);
    //       return response.data.token;
    //     } catch (error) {
    //       console.error('Error fetching Stream Video token:', error);
    //       toast.error('Failed to fetch Stream Video token');
    //       return null;
    //     }
    //   };

    const slotDateFormat = useCallback((slotDate) => {
        const months = [' ', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    }, [ ]); //Removed dependency cycle

    const value = {
        doctors,
        getDoctorsData,
        beds,
        token,
        setToken,
        currencySymbol,
        loading,
        calculateRating,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        getBedsData,
        slotDateFormat  // Remove getStreamVideoToken
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                await getDoctorsData();
                await getBedsData();
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [getDoctorsData, getBedsData]);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token, loadUserProfileData]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
            <Toaster />
        </AppContext.Provider>
    );
};

export default AppContextProvider;