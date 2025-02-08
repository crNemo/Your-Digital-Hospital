import React, { useEffect, useState } from 'react';

const AllNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchNotifications();
    }, []);

    const sortedNotifications = notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

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
                            className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:border-blue-500"
                        >
                            <h2 className="text-xl font-semibold text-gray-900">{notification.title}</h2>
                            <p className="text-gray-700 mt-2">{notification.body}</p>
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
