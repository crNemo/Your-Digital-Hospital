import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = 'NRs';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const value = {
    doctors,
    beds,
    currencySymbol,
    loading,
    calculateRating: (doctor) => {
      if (!doctor.reviews || doctor.reviews.length === 0) return 0;
      const totalRating = doctor.reviews.reduce((acc, review) => acc + review.rating, 0);
      return totalRating / doctor.reviews.length;
    }
  };

  const getDoctorsData = async () => {
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
      if (error.response) {
        toast.error(`Request failed with status code ${error.response.status}: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error('No response received from server');
      } else {
        toast.error(error.message);
      }
    }
  };

  const getBedsData = async () => {
    // console.log("Fetching beds data...");
    // console.log("Backend URL:", backendUrl);

    try {
      const { data } = await axios.get(`${backendUrl}/api/bed/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log("Beds data received:", data);

      if (data.success) {
        setBeds(data.beds);
        // console.log("Beds state updated:", data.beds);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Request failed with status code ${error.response.status}: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error('No response received from server');
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDoctorsData();
      await getBedsData();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;