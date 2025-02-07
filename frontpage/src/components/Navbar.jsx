import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import BellIcon from './BellIcon';
import { RiHomeSmile2Fill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaAmbulance } from "react-icons/fa";




const Navbar = () => {
    const navigate = useNavigate();

    const { token, setToken, userData } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/notification');
                const responseJson = await response.json();

                const storedReadStatus = JSON.parse(localStorage.getItem('readNotifications')) || [];

                const updatedNotifications = responseJson.map((notification) => ({
                    ...notification,
                    read: storedReadStatus.includes(notification._id),
                }));

                const unreadNotifications = updatedNotifications.filter((notification) => !notification.read);

                setNotifications(updatedNotifications);
                setUnreadCount(unreadNotifications.length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();

        const id = setInterval(fetchNotifications, 2000);
        return () => clearInterval(id);
    }, []);

    const markAsRead = (id) => {
        setNotifications((prev) => {
            const updatedNotifications = prev.map((notification) =>
                notification._id === id ? { ...notification, read: true } : notification
            );

            const unreadNotifications = updatedNotifications.filter((notification) => !notification.read);
            setUnreadCount(unreadNotifications.length);

            const readNotifications = updatedNotifications.filter((notification) => notification.read).map((notification) => notification._id);
            localStorage.setItem('readNotifications', JSON.stringify(readNotifications));

            return updatedNotifications;
        });
    };

    const markAllAsRead = () => {
        setNotifications((prev) => {
            const updatedNotifications = prev.map((notification) => ({
                ...notification,
                read: true,
            }));

            setUnreadCount(0);

            const readNotifications = updatedNotifications.map((notification) => notification._id);
            localStorage.setItem('readNotifications', JSON.stringify(readNotifications));

            return updatedNotifications;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
       
            <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#c2c2ed]'>
                <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
                <ul className='hidden md:flex items-start gap-5 font-medium'>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}>
                        <li className='flex items-center gap-2'>
                            <RiHomeSmile2Fill className='w-6 h-6' />
                            HOME
                        </li>
                    </NavLink>
                    <NavLink to='/doctors' className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}>
                        <li className='flex items-center gap-2'>
                            <FaUserDoctor className='w-6 h-6' />
                            ALL DOCTORS
                        </li>
                    </NavLink>
                    <NavLink to='/bed' className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}>
                        <li className='flex items-center gap-2'>
                            <FaBed className='w-6 h-6' />
                            BEDS
                        </li>
                    </NavLink>
                    <NavLink to='/ambulance' className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}>
                        <a href='http://localhost:3000/' target='_blank' rel='noopener noreferrer'>
                            <li className='flex items-center gap-2'>
                                <FaAmbulance className='w-6 h-6' />
                                CALL AMBULANCE
                            </li>
                        </a>
                    </NavLink>
                </ul>
                <div className='flex items-center gap-15'>
                    <BellIcon className="relative inline-flex items-center justify-center" notifications={notifications} unreadCount={unreadCount} markAsRead={markAsRead} markAllAsRead={markAllAsRead} />
                    {
                        token && userData
                            ? <div className='flex items-center gap-2 cursor-pointer group relative dropdown'>
                                <img className='w-8 rounded-full' src={userData.image} alt="" onClick={() => setShowDropdown(prev => !prev)} />
                                <img className='w-2.5' src={assets.dropdown_icon} alt="" onClick={() => setShowDropdown(prev => !prev)} />
                                {showDropdown && (
                                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-grey-600 z-20'>
                                        <div className='min-w-48 bg-[#c2c2ed] rounded flex flex-col gap-4 p-4 shadow-lg transition-all duration-300 transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100'>
                                            <p onClick={() => navigate('my-profile')} className='hover:text-[#435f78] cursor-pointer'>My Profile</p>
                                            <p onClick={() => navigate('my-appointments')} className='hover:text-[#435f78] cursor-pointer'>My Appointments</p>
                                            <p onClick={logout} className='hover:text-[#435f78] cursor-pointer'>Logout</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            : (<button onClick={() => navigate('/login')} className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>)
                    }
                    <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                    {/* mobile menu */}
                    <div
                        className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'
                            } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
                    >
                        <div className='flex items-center justify-between px-5 py-6'>
                            <img className='w-36' src={assets.logo} alt="" />
                            <img
                                className='w-7'
                                onClick={() => setShowMenu(false)}
                                src={assets.cross_icon}
                                alt=""
                            />
                        </div>
                        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                            <NavLink onClick={() => setShowMenu(false)} to='/'>
                                <p className='px-4 py-2 rounded inline-block'>Home</p>
                            </NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
                                <p className='px-4 py-2 rounded inline-block'>All Doctors</p>
                            </NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/ambulance'>
                                <p className='px-4 py-2 rounded inline-block text-red-400'>Call Ambulance</p>
                            </NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/notifications'>
                                <p className='px-4 py-2 rounded inline-block '>Notifications</p>
                            </NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/create'>
                                <p className='px-4 py-2 rounded inline-block '>Create Notifications</p>
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        
    );
};

export default Navbar;
