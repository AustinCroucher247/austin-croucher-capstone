import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import ActiveStreams from './Components/ActiveStreams/ActiveSteams';
import GameRoom from './Components/GameRoom/GameRoom';
import Leaderboards from './Components/Leaderboards/Leaderboards';
import AboutUs from './Components/AboutUs/AboutUs';
import Login from './Components/Login/Login';
import SpaceGamePage from './Components/SpaceInvaders/SpaceGamePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/HomePage' element={<HomePage />}></Route>
        <Route path='/ActiveStreams' element={<ActiveStreams />}></Route>
        <Route path='/GameRoom' element={<GameRoom />}></Route>
        <Route path='/Leaderboards' element={<Leaderboards />}></Route>
        <Route path='/AboutUs' element={<AboutUs />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/SpaceInvaders' element={<SpaceGamePage />}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
