import React from 'react';
import { useEffect } from 'react';

function ActiveRooms({ rooms, handleJoinRoom, handleCloseRoom, roomList }) {
    useEffect(() => {
        console.log(rooms)
    }, [rooms])
    return (
        <div>
            <h2>Active Rooms</h2>
            <ul>
                {roomList.map((room) => (
                    <li key={room.id}>
                        Room ID: {room.id} - Players: {room.players.length}
                        <button onClick={() => handleJoinRoom(room.id)}>Join</button>
                        <button onClick={() => handleCloseRoom(room.id)}>Close Room</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActiveRooms;