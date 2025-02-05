import React from 'react';

const ChatMessage = ({ sender, text }) => {
    return <div style={{marginBottom: '5px'}}><b>{sender}:</b> {text}</div>
}

export default ChatMessage;