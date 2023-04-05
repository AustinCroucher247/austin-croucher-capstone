import React from 'react';
import './ActiveSpaceInvaders.scss'
import Header from '../Header/Header';
import ActiveRooms from '../ActiveStreams/ActiveRooms';

function ActiveSpaceInvaders({ rooms, handleCloseRoom, handleJoinRoom }) {
    const roomList = Object.entries(rooms).map(([roomId, room]) => ({ id: roomId, players: room.players }));

    return (
        <div>
            <Header />
            {Object.keys(rooms).length === 0 && <p>No active streams, go play yourself!</p>}
            {Object.keys(rooms).length > 0 && <ActiveRooms rooms={rooms} handleJoinRoom={handleJoinRoom} handleCloseRoom={handleCloseRoom} roomList={roomList} />}
        </div>
    );
}

export default ActiveSpaceInvaders;