import React, { useContext } from 'react'
import Login from './pages/Login'
import toast, { Toaster } from 'react-hot-toast';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctors from './pages/Admin/AddDoctor.jsx';
import AddBed from './pages/Admin/AddBed';
import BedList from './pages/Admin/BedList';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';

const App = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

    return aToken || dToken ? (
        <div className='bg-[#F8F9FD]'>
            <Toaster />
            <Navbar />
            <div className='flex items-start'>
                <Sidebar />
                <Routes>
                    {/*AdminRoute*/}
                    <Route path='/' element={<></>} />
                    <Route path='/admin-dashboard' element={<Dashboard />} />
                    <Route path='/all-appointments' element={<AllAppointments/>} />
                    <Route path='/add-doctors' element={<AddDoctors/>} />
                    <Route path='/doctor-list' element={<DoctorsList/>} />
                    <Route path='/add-beds' element={<AddBed />} />
                    <Route path='/bed-list' element={<BedList />} />
                    {/*DoctorRoute*/}
                    <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
                    <Route path='/doctor-appointments' element={<DoctorAppointments/>} />
                    <Route path='/doctor-profile' element={<DoctorProfile/>} />


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