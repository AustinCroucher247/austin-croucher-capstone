import { object } from 'prop-types';
import React from 'react';
import { useEffect } from 'react';

function ActiveRooms({ rooms, handleJoinRoom, handleCloseRoom }) {
    useEffect(() => {
        console.log(rooms)
    }, [rooms])
    return (
        <div>
            <h2>Active Rooms</h2>
            <ul>
                {Object.entries(rooms).map((room) => (
                    <li key={room.host}>
                        Host: {room.username} - Players: {room.players.length}
                        <button onClick={() => handleJoinRoom(room.host)}>Join</button>
                        <button onClick={() => handleCloseRoom(room.host)}>Close Room</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActiveRooms;