import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa'; // Ensure react-icons is installed
import { useNavigate } from 'react-router-dom';

function BellIcon({ notifications, unreadCount, markAsRead, markAllAsRead }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
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

  const sortedNotifications = notifications.sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayedNotifications = showAll ? sortedNotifications.slice(0, 8) : sortedNotifications.slice(0, 5);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div className="relative cursor-pointer" onClick={handleIconClick}>
        <FaBell className="text-3xl" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
      {showDropdown && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <p className="text-gray-900 font-medium">Notifications</p>
            <button
              className="text-blue-500 text-sm cursor-pointer"
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
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${notification.read ? 'bg-gray-100' : ''}`}
                onClick={() => markAsRead(notification._id)}
              >
                <p className="text-gray-900 font-medium">{notification.title}</p>
                <p className="text-gray-600 text-sm break-words whitespace-normal">{notification.body}</p>
              </div>
            ))
          )}
          {notifications.length > 5 && !showAll && (
            <button
              className="w-full text-blue-500 text-sm p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100"
              onClick={() => setShowAll(true)}
            >
              Show all
            </button>
          )}
          {notifications.length > 8 && showAll && (
            <button
              className="w-full text-blue-500 text-sm p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100"
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