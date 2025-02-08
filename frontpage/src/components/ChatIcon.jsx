import React, { useState } from "react";

const ChatIcon = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center group">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group
          relative
          flex items-center justify-start
          h-12 px-4
          rounded-full
          focus:outline-none
          overflow-hidden
          bg-gradient-to-r
          from-blue-800
          to-blue-600
          text-white
          shadow-xl
          transition-all duration-500 ease-in-out
          hover:shadow-blue-400/50
          ${isHovered ? "w-36 pl-5 pr-6" : "w-14"}
          animate-floating
        `}
      >
        {/* Circuit Pulse Animation */}
        <span className="
          absolute inset-0 rounded-full border-2 border-transparent
          pointer-events-none animate-circuit-pulse group-hover:border-blue-400
        "></span>

        {/* Robotic Icon - Moves slightly left on hover */}
        <svg
          className={` rotating-logo 
            w-8 h-8 transition-all duration-500 ease-in-out transform
            ${isHovered ? "translate-x-[-8px]" : "translate-x-0"}
          `}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2zM12 16c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2zM16 12c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2zM8 12c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2z"
          />
        </svg>

        {/* Appearing Text with Flicker Effect */}
        <span
          className={`
            absolute left-12 whitespace-nowrap font-bold opacity-0
            transition-opacity duration-500 ease-in-out
            font-mono text-sm
            ${isHovered ? "opacity-100 animate-text-flicker" : "opacity-0"}
          `}
        >
          हाम्रो जासूस
        </span>

        {/* Hover Electric Sparks Effect */}
        {isHovered && (
          <>
            <span className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full animate-spark"></span>
            <span className="absolute bottom-1 right-1 w-2 h-2 bg-white rounded-full animate-spark"></span>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-spark"></span>
          </>
        )}
      </button>

      {/* Embedded CSS for Animations */}
      <style>{`
        /* Floating animation */
        @keyframes floating {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        .animate-floating {
          animation: floating 3s ease-in-out infinite;
        }

        /* Circuit pulse effect */
        @keyframes circuit-pulse {
          0%, 100% { box-shadow: 0 0 5px 2px rgba(0, 150, 255, 0.5); }
          50% { box-shadow: 0 0 20px 5px rgba(0, 150, 255, 1); }
        }
        .animate-circuit-pulse {
          animation: circuit-pulse 2s infinite alternate;
        }

        /* Electric sparks animation */
        @keyframes spark {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          50% { transform: translate(-3px, 3px) scale(1.3); opacity: 0.7; }
          100% { transform: translate(3px, -3px) scale(1); opacity: 0; }
        }
        .animate-spark {
          animation: spark 0.8s infinite alternate ease-in-out;
        }

        /* Text flicker effect */
        @keyframes text-flicker {
          0% { opacity: 0.1; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .animate-text-flicker {
          animation: text-flicker 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ChatIcon;
