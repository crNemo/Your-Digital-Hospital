import React, { useEffect, useState } from 'react';

const AllNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/notification');
                const responseJson = await response.json();
                setNotifications(responseJson);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const sortedNotifications = notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Notifications</h1>
            {sortedNotifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                sortedNotifications.map((notification) => (
                    <div key={notification._id} className="p-4 border-b border-gray-200">
                        <h1 className="text-gray-900 font-bold text-1xl">{notification.title}</h1>
                        <p className="text-gray-600 text-sm">{notification.body}</p>
                        <p>Posted at:{new Date(notification.date).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default AllNotifications;