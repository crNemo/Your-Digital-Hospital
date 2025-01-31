import { createContext, useState, useEffect } from "react";
import { beds } from "../assets/assets";
import axios from "axios";
import { toast } from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = 'NRs';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const value ={
    doctors,
    currencySymbol
  }

  const getDoctorsData = async () => {
    try {
      
      const {data} = await axios.get(backendUrl + '/api/doctor/list');

      if (data.success) {
        setDoctors(data.doctors);
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getDoctorsData()
  },[])



  useEffect(() => {
    // Simulate fetching data
    const doctorsData = []; // Define doctorsData here
    setTimeout(() => {
      setDoctors(doctorsData);
      setLoading(false);
    }, 1000);
  }, []);

  // Function to calculate the average rating
  const calculateRating = (doctor) => {
    if (!doctor || !doctor.reviews || doctor.reviews.length === 0) {
      return 0;
    }
    const totalReviews = doctor.reviews.length;
    const totalRating = doctor.reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalReviews ? (totalRating / totalReviews).toFixed(1) : 0;
  };

  return (
    <AppContext.Provider value={{ doctors, calculateRating, loading, beds, currencySymbol }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;