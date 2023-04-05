import React from 'react';

function ActiveRooms({ rooms, handleJoinRoom, handleCloseRoom }) {
    return (
        <div>
            <h2>Active Rooms</h2>
            <ul>
                {Object.entries(rooms).map(([roomId, room]) => (
                    <li key={roomId}>
                        Room ID: {roomId} - Players: {room.players.length}
                        <button onClick={() => handleJoinRoom(roomId)}>Join</button>
                        <button onClick={() => handleCloseRoom(roomId)}>Close Room</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActiveRooms;
