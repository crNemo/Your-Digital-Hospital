import React, { createContext, useState, useEffect } from "react";
import { doctors as doctorsData } from "../assets/assets";
import { beds } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = 'NRs';

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
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