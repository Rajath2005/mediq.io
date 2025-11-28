import React from 'react';

const ChatbotPage = () => {
    const ayurUrl = process.env.REACT_APP_AYUR_URL || "http://localhost:5000/";

    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <iframe
                src={ayurUrl}
                title="Ayudost AI Chatbot"
                style={{ flex: 1, border: 'none', width: '100%' }}
                allow="microphone; clipboard-read; clipboard-write"
            />
        </div>
    );
};

export default ChatbotPage;
