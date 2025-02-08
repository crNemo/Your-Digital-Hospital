import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-36 sm:w-40 cursor-pointer transition-transform hover:scale-105" src={assets.admin_logo} alt="Logo" />
        <p className="border px-3 py-1 rounded-full border-gray-300 text-gray-600 bg-gray-50">{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button 
        onClick={logout} 
        className="bg-primary text-white text-sm px-8 py-2 rounded-full cursor-pointer transition-all hover:bg-primary-dark hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
