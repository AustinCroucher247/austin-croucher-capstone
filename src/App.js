import './App.css';
import { useState, useEffect, useRef } from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import ActiveStreams from './Components/ActiveStreams/ActiveSteams';
import GameRoom from './Components/GameRoom/GameRoom';
import Leaderboards from './Components/Leaderboards/Leaderboards';
import AboutUs from './Components/AboutUs/AboutUs';
import Login from './Components/Login/Login';
import SpaceGamePage from './Components/SpaceInvaders/SpaceGamePage';
import ActivePacMan from './Components/ActivePacMan/ActivePacMan'
import ActiveSpaceInvaders from './Components/ActiveSpaceInvaders/ActiveSpaceInvaders'
import UserPage from './Components/UserPage/UserPage';
import ChatRoom from './Components/SpaceInvaders/ChatRoom';
import { Navigate } from 'react-router-dom';

import { io } from 'socket.io-client';

const SERVER_ADDRESS = 'https://austin-croucher-retro-rumble.herokuapp.com'

function App() {
  const [rooms, setRooms] = useState({});
  // const [roomList, setRoomList] = useState([]);

  const socketRef = useRef(null);
  const [navigateToChatRoom, setNavigateToChatRoom] = useState(null);


  useEffect(() => {
    socketRef.current = io(`${SERVER_ADDRESS}`, {
      transports: ['websocket', 'polling'],
    });

    // socketRef.current.on('connect', () => {
    //   console.log('Connected to WebSocket server:', socketRef.current.id);
    // });

    socketRef.current.on('updateRooms', (updatedRooms) => {
      setRooms(updatedRooms);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off('updateRooms');
      }
      socketRef.current.disconnect();
    };
  }, []);

  const handleCloseRoom = (roomId) => {
    socketRef.current.emit('closeRoom', roomId);
  };

  const handleJoinRoom = (roomId) => {
    socketRef.current.emit('joinRoom', roomId);
    setNavigateToChatRoom(<Navigate to={`/ChatRoom/${roomId}`} />);
  };

  // useEffect(() => {
  //   setRoomList(Object.entries(rooms).map(([roomId, room]) => ({ id: roomId, players: room.players })));
  // }, [rooms]);

  return (
    <BrowserRouter>
      {navigateToChatRoom}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/ActiveStreams' element={<ActiveStreams />} />
        <Route path='/GameRoom' element={<GameRoom />} />
        <Route path='/Leaderboards' element={<Leaderboards />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SpaceInvaders' element={<SpaceGamePage socketRef={socketRef} />} />
        <Route path='/ActiveStreams/Pacman' element={<ActivePacMan />} />
        <Route path='/ActiveStreams/SpaceInvaders' element={<ActiveSpaceInvaders rooms={rooms} handleJoinRoom={handleJoinRoom} handleCloseRoom={handleCloseRoom} />} />
        <Route path='/ChatRoom/:roomId' element={<ChatRoom />} />
        <Route path="/UserPage" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;