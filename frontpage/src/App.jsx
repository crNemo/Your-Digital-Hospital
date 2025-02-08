import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Ambulance from './pages/Ambulance';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Bed from './pages/Bed';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BedAppointment from './pages/BedAppointment';
import CreateNotification from './pages/CreateNotification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatIcon from './components/ChatIcon';
import ChatWindow from './components/ChatWindow';
import AllNotifications from './pages/AllNotifications';
import IndividualNotification from './pages/IndividualNotification';

const App = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className='mx-4 sm:mx-[10%]'>
            
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/doctors' element={<Doctors />} />
                <Route path='/doctors/:speciality' element={<Doctors />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create' element={<CreateNotification />} />
                <Route path='/ambulance' element={<Ambulance />} />
                <Route path='/my-profile' element={<MyProfile />} />
                <Route path='/my-appointments' element={<MyAppointments />} />
                <Route path='/appointment/:docId' element={<Appointment />} />
                <Route path='/bed' element={<Bed />} />
                <Route path='/bed-appointment/:bedId' element={<BedAppointment />} />
                <Route path='/all-notifications' element={<AllNotifications />} />
                <Route path='/notifications/:id' element={<IndividualNotification/>}/>

            </Routes>
            <ChatIcon onClick={toggleChat} />
            {isChatOpen && <ChatWindow onClose={toggleChat} />}
            <Footer />
        </div>
    );
};

export default App;