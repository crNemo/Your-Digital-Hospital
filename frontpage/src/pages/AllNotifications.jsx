import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AllNotifications = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state || {}; // Add a fallback to an empty object
    const id = data.id || ''; // Add a fallback to an empty string
    const [user, setUser] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setUserName = async () => {
            const response = await fetch('http://localhost:4000/api/user/get-profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = await response.json();
            setUser(userData.userData.name);
        };

        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/notification');
                const responseJson = await response.json();
                setNotifications(responseJson);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setLoading(false);
            }
        };

        setUserName();
        fetchNotifications();
    }, [token]);

    const sortedNotifications = notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleNotificationClick = (notification) => {
        navigate(`/notifications/${notification._id}`, {
            state: { title: notification.title, body: notification.body, user: notification.user, id: notification._id }
        });
        window.scrollTo(0, 0);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">All Notifications</h1>

            {loading ? (
                <div className="text-center text-gray-600">Loading notifications...</div>
            ) : sortedNotifications.length === 0 ? (
                <p className="text-center text-gray-600">No notifications available.</p>
            ) : (
                <div className="space-y-4">
                    {sortedNotifications.map((notification) => (
                        <div
                            key={notification._id}
                            className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:border-blue-500 cursor-pointer"
                            onClick={() => handleNotificationClick(notification)}
                        >
                            <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-gray-300">
                                {notification.title ? (
                                    <h1 className="text-3xl font-bold text-blue-600">{notification.title} <span className="text-sm text-gray-500">(Posted by: {notification.user})</span></h1>
                                ) : (
                                    <h1 className="text-3xl font-bold text-red-500">Failed to load</h1>
                                )}
                                <p className="mt-3 text-gray-700">{notification.body || 'Failed to load'}</p>
                            </div>
                            <p className="mt-4 text-sm text-gray-500">
                                Posted at: {new Date(notification.date).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllNotifications;
