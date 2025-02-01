import React, { useState } from 'react';
const ChatInput = ({ onMessageSubmit }) => {
    const [input, setInput] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('input value', input); // Add this line
        if (input.trim()) {
            onMessageSubmit(input);
            setInput("");
        }
    }
    return <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." style={{margin: '5px 0', width: '70%', padding: 8}}/>
        <button type="submit" style={{padding: 8}}>Send</button>
    </form>
}
export default ChatInput