import React from 'react';
import './ActiveSpaceInvaders.scss'
import Header from '../Header/Header';
import ActiveRooms from '../ActiveStreams/ActiveRooms';

// Add the props parameter in the function
function ActiveSpaceInvaders({ rooms, handleCloseRoom, handleJoinRoom }) {
    return (
        <div>
            <Header />
            <ActiveRooms rooms={rooms} handleJoinRoom={handleJoinRoom} handleCloseRoom={handleCloseRoom} />
        </div>
    );
}

export default ActiveSpaceInvaders;