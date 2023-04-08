import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Header from '../Header/Header';
import GameComponent from './GameMountComp';
import { useNavigate } from 'react-router-dom';
const SERVER_ADDRESS = 'http://localhost:8080';

function ChatRoom(props) {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef(null);

    const username = localStorage.getItem('username');

    useEffect(() => {
        socketRef.current = io(`${SERVER_ADDRESS}`, {
            transports: ['websocket', 'polling'],
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket server:', socketRef.current.id);
            socketRef.current.emit('joinRoom', roomId); // Join the current room
        });

        socketRef.current.emit('requestChatHistory', roomId);

        socketRef.current.on('chatHistory', (history) => {
            setMessages(history);
        });

        socketRef.current.on('chatMessage', (message) => {
            setMessages((messages) => [...messages, message]);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from WebSocket server:', socketRef.current.id);
            navigate('/ActiveStreams');
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [roomId, navigate]);

    const handleMessageInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleMessageFormSubmit = (event) => {
        event.preventDefault();
        if (message.trim() === '') {
            return;
        }
        const newMessage = {
            roomId,
            text: message.trim(),
            senderId: socketRef.current.id,
            senderName: username || "Guest"
        };
        socketRef.current.emit('message', newMessage);
        setMessages((messages) => [...messages, newMessage]);
        setMessage('');
    };

    return (
        <div>
            <Header />

            <div className='viewer--container'>
                {
                    socketRef.current && (
                        <GameComponent player={false} socketRef={socketRef} />
                    )
                }
                <div className='parent-container'>
                    <h2>Chat Room:</h2>
                    <div>
                        {messages.map((message, index) => (
                            <div key={index}>
                                <p>{message.text}</p>
                                <small>from: {message.senderName}</small>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleMessageFormSubmit}>
                        <input type="text" value={message} onChange={handleMessageInputChange} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;