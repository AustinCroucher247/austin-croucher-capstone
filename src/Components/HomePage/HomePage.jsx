import './HomePage.scss'
import Header from '../Header/Header';
import SpaceInvaders from '../../assets/spaceinvaders.jpg'
import { Link } from 'react-router-dom';
import PacMan from '../../assets/PacMan.png'
import { useState } from 'react';
import Video from '../../assets/SpaceInvaderVideo1.mp4'


function HomePage() {
    const [currentGame, setCurrentGame] = useState('Space Invaders');

    function handleButtonClick() {
        setCurrentGame(currentGame === 'Space Invaders' ? 'Pac-man' : 'Space Invaders');
    } return (
        <>
            <Header />
            <div className='sidebar'>
                <h1 className='sidebar--text'>Featured Game</h1>
                <div className="card">
                    <img className="card-img" src={SpaceInvaders} alt="Thumbnail" />
                    <div className="card-body">
                        <h2 className="card-title">Space Invaders</h2>
                        <p className="card-text">Space Invaders is a classic arcade video game where players control a laser cannon to defend Earth against waves of invading aliens.</p>
                        <div className='button--container1'>
                            <Link to={'/SpaceInvaders'}> <button className="card-button-play">Play Now</button></Link>
                            <Link to={'/ActiveStreams'}> <button className="card-button">Watch Now</button></Link>
                        </div>

                    </div>
                </div>
            </div>
            <div className='test'>
                <div className='promoted'>
                    <video className='promoted--video' src={Video} controls={false} loop autoPlay muted></video>
                    <h1 className='promoted--stream--header'>Promoted Stream</h1>

                </div>
                <h1 className='streamer'>Shotgun247 Playing SpaceInvaders</h1>
                <div className='button--container1'>
                    <Link to={'/SpaceInvaders'}> <button className="card-button-play">Play Now</button></Link>
                    <Link to={'/ActiveStreams'}> <button className="card-button">Watch Now</button></Link>
                </div>

            </div>

            <div className='sidebar2'>
                <h1 className='sidebar2--text'>Games List</h1>
                {currentGame === 'Space Invaders' && (
                    <div className="card2">
                        <img className="card-img2" src={SpaceInvaders} alt="Thumbnail" />
                        <div className="card-body">
                            <h2 className="card-title">Space Invaders</h2>
                            <div className='button--container2'>
                                <Link to={'/SpaceInvaders'}><button className="card-button-play">Play Now</button></Link>
                                <Link to={'/ActiveStreams'}><button className="card-button">Watch Now</button></Link>
                            </div>
                        </div>
                    </div>
                )}
                {currentGame === 'Pac-man' && (
                    <div className="card2">
                        <img className="card-img2" src={PacMan} alt="Thumbnail" />
                        <div className="card-body">
                            <h2 className="card-title">Pac-man</h2>
                            <div className='button--container2'>
                                <Link to={'/PacMan'}><button className="card-button-play">Play Now</button></Link>
                                <Link to={'/ActiveStreams'}><button className="card-button">Watch Now</button></Link>
                            </div>
                        </div>
                    </div>
                )}
                <button className='switchgame-button' onClick={handleButtonClick}>Switch Game</button>
            </div>

        </>
    );
}

export default HomePage;
