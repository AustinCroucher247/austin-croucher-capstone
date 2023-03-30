import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        {/* <Route path='/HomePage' element={<HomePage />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
