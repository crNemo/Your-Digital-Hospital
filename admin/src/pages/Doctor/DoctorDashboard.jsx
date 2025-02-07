import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    <div>
      {dashData ? (
        <div>
          <h1>Dashboard Data</h1>
          <pre>{JSON.stringify(dashData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DoctorDashboard;