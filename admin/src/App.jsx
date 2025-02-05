import React from 'react'
import Login from './pages/Login'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctors from './pages/Admin/AddDoctor.jsx';

const App = () => {

  const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <Toaster />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctors' element={<AddDoctors/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <Toaster />
    </>
  )
}

export default App