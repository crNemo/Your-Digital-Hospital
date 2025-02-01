import React from 'react';

const ChatIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-5
        right-5
        bg-blue-500
        hover:bg-blue-600
        text-white
        rounded-full
        p-3
        focus:outline-none
        shadow-lg
        transition-all
        duration-300
        transform
        hover:scale-110
        active:scale-95
        z-50
      "
    >
      Hamro Jasoos
    </button>
  );
};

export default ChatIcon;