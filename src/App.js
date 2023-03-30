import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/HomePage' element={<HomePage />}></Route>
        {/* <Route path='/Leaderboards' element={<Leaderboards />}></Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
