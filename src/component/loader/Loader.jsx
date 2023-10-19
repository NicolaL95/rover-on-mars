import React, { useState, useEffect } from 'react';

const Loader = ({ onFinished }) => {
    const [messages, setMessages] = useState([]);
    const commands = [
        "Starting connection...",
        "Injecting supporting component...",
        "Initialization rover status...",
        "Loading data...",
        "Connection completed."
    ];

    useEffect(() => {
        let currentCommand = 0;
        const interval = setInterval(() => {
            if (currentCommand < commands.length) {
                setMessages(prev => [...prev, commands[currentCommand]]);
                currentCommand++;
            } else {
                clearInterval(interval);
                onFinished();
            }
        }, 500); // ogni 600ms apparirà un nuovo comando

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ backgroundColor: 'black', color: 'lime', padding: '20px', fontFamily: 'Courier New, Courier, monospace', fontSize: '16px',marginTop:"20px"}}>
            {messages.map((msg, index) => (
                <div key={index}> {msg}</div>
            ))}
        </div>
    );
};

export default Loader;