import React, { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import DoctorsList from './pages/Admin/DoctorsList'
import AddDoctors from './pages/Admin/AddDoctor.jsx'
import AddBed from './pages/Admin/AddBed'
import BedList from './pages/Admin/BedList'
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx'
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx'
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx'
import { TransitionGroup, CSSTransition } from 'react-transition-group'// Make sure you add your CSS for transitions

const App = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)
    const location = useLocation()  // Get current location for smooth transitions

    return aToken || dToken ? (
        <div className='bg-[#F8F9FD]'>
            <Toaster />
            <Navbar />
            <div className='flex items-start'>
                <Sidebar />
                  
                        <Routes location={location}>
                            {/* Admin Routes */}
                            <Route path='/admin-dashboard' element={<Dashboard />} />
                            <Route path='/all-appointments' element={<AllAppointments />} />
                            <Route path='/add-doctors' element={<AddDoctors />} />
                            <Route path='/doctor-list' element={<DoctorsList />} />
                            <Route path='/add-beds' element={<AddBed />} />
                            <Route path='/bed-list' element={<BedList />} />
                            {/* Doctor Routes */}
                            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
                            <Route path='/doctor-profile' element={<DoctorProfile />} />
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
