import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BellIcon({ notifications, unreadCount, markAsRead, markAllAsRead }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [shownNotifications, setShownNotifications] = useState(() => {
    const saved = localStorage.getItem('shownNotifications');
    return saved ? JSON.parse(saved) : [];
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0];
      if (
        Notification.permission === 'granted' &&
        !latestNotification.read &&
        !shownNotifications.includes(latestNotification._id)
      ) {
        new Notification(latestNotification.title, {
          body: latestNotification.body,
        });
        const updatedShownNotifications = [...shownNotifications, latestNotification._id];
        setShownNotifications(updatedShownNotifications);
        localStorage.setItem('shownNotifications', JSON.stringify(updatedShownNotifications));
      }
    }
  }, [notifications, shownNotifications]);

  const sortedNotifications = notifications.sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayedNotifications = showAll ? sortedNotifications.slice(0, 8) : sortedNotifications.slice(0, 5);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div className="relative cursor-pointer" onClick={handleIconClick}>
        <Bell size={27} className='pl-1 transition-transform transform hover:scale-110' />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </div>
      {showDropdown && (
        <div
          className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
          style={{
            opacity: showDropdown ? 1 : 0,
            transform: showDropdown ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <p className="text-gray-900 font-semibold">Notifications</p>
            <button
              className="text-blue-500 text-sm cursor-pointer hover:underline"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
          {displayedNotifications.length === 0 ? (
            <p className="p-4 text-gray-600">No new notifications</p>
          ) : (
            displayedNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-200 transform hover:scale-105 ${
                  notification.read ? 'bg-gray-100' : ''
                }`}
                onClick={() => {markAsRead(notification._id)
                  navigate(`/notifications/${notification._id}`,{
                    state:{title:notification.title,body:notification.body,user:notification.user,id:notification._id}
                  })
                }}
              >
                
                <p className="text-amber-700 underline font-medium ">@{notification.user}</p>

                <p className="text-gray-900 font-medium">{notification.title}</p>
                <p className="text-gray-600 text-sm break-words whitespace-normal">{notification.body}</p>
                <p className="text-xs text-gray-500">{new Date(notification.date).toLocaleString()}</p>

              </div>
            ))
          )}
          {notifications.length > 5 && !showAll && (
            <button
              className="w-full text-blue-500 text-sm p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setShowAll(true)}
            >
              Show all
            </button>
          )}
          {notifications.length > 8 && showAll && (
            <button
              className="w-full text-blue-500 text-sm p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => navigate('/all-notifications')}
            >
              View all notifications
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default BellIcon;
