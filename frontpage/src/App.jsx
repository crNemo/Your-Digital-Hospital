// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Ambulance from './pages/Ambulance'
import Login from './pages/Login'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Bed from './pages/Bed'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BedAppointment from './pages/BedAppointment'
import Notifications from './pages/Notifications'
import CreateNotification from './pages/CreateNotification'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<CreateNotification/>}/>
        <Route path='/contact' element={<Contact />} />
        <Route path='/ambulance' element={<Ambulance />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/bed' element={<Bed />} />
        <Route path='/bed-appointment/:bedId' element={<BedAppointment />} />
        <Route path='/notifications' element={<Notifications/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
