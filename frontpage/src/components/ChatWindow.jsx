import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { assets } from '../assets/assets';

const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([]);

    const handleMessageSubmit = async (message) => {
        setMessages([...messages, {text: message, sender: 'You'}]);
         console.log('Message being sent', message); // Add this line

      // Use an ABSOLUTE URL instead of the relative one
      fetch('http://localhost:4000/api/recognize', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
      }).then(response => response.json())
        .then(data => {
          setMessages([...messages, {text: message, sender: 'You'}, {text: data.response, sender: 'जासूस'}])
      }).catch(error => {
         setMessages([...messages, {text: message, sender: 'You'}, {text: "Error processing your request.", sender: 'जासूस'}])
      });
    }

  return (
    <div className="border rounded-2xl shadow-lg" style={{position: 'fixed', bottom: 80, right: 20, backgroundColor: 'white', border: '1px solid #ccc', padding: 10, width: 300, height: '400px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div></div>
        <button className="cursor-pointer" onClick={onClose} style={{marginTop: 10}}><img src={assets.close} alt="Close" style={{marginTop:1,width: 25, height: 25 }} /></button>
      </div>
      <div style={{ height: 300, overflowY: 'scroll', borderBottom: '1px solid #ddd', padding: 5 }}>
        {messages.map((msg, index) => <ChatMessage key={index} sender={msg.sender} text={msg.text}/>)}
      </div>
      <ChatInput onMessageSubmit={handleMessageSubmit} />
    </div>
  );
};

export default ChatWindow;