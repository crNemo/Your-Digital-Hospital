import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { assets } from '../assets/assets';

const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([]);

    // Function to format **bold** text
    const formatMessage = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // Converts **text** to <b>text</b>
    };

    const handleMessageSubmit = async (message) => {
        setMessages([...messages, { text: message, sender: 'You' }]);

        fetch('http://localhost:4000/api/recognize', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        })
            .then(response => response.json())
            .then(data => {
                setMessages((prevMessages) => [
                    ...prevMessages, 
                    { text: data.response, sender: 'जासूस' }
                ]);
            })
            .catch(() => {
                setMessages((prevMessages) => [
                    ...prevMessages, 
                    { text: "Error processing your request.", sender: 'जासूस' }
                ]);
            });
    };

    return (
        <div className="fixed bottom-20 right-5 w-72 sm:w-80 h-[450px] bg-white border border-gray-300 shadow-xl rounded-2xl p-4 animate-slide-in flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
                <span className="font-semibold text-lg text-gray-700">हाम्रो जासूस</span>
                <button className="cursor-pointer p-1 rounded-full hover:bg-gray-200" onClick={onClose}>
                    <img src={assets.close} alt="Close" className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-3 space-y-3">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                        <span className="text-xs text-gray-500 mb-1">{msg.sender}</span>
                        <div 
                            className={`p-3 rounded-xl max-w-xs shadow-md 
                            ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="pt-2 border-t">
                <ChatInput onMessageSubmit={handleMessageSubmit} />
            </div>
        </div>
    );
};

export default ChatWindow;
