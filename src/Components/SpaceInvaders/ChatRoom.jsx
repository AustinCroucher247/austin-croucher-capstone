// Add the import at the top of ChatRoom.js
import { useParams } from 'react-router-dom';
import React from 'react';
import Header from '../Header/Header';

// Modify the ChatRoom component
function ChatRoom() {
    const { roomId } = useParams();

    return (
        <>
            <Header />
            <div>
                <h1>Room: {roomId}</h1>
                {/* Add your chat functionality here */}
            </div>
        </>
    );
}

export default ChatRoom;