import './HomePage.scss'
import Header from '../Header/Header';
import SpaceInvaders from '../../assets/spaceinvaders.jpg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Video from '../../assets/SpaceGame.mp4'
import TetrisImg from '../../assets/tetris.jpg'



function HomePage() {
    const [currentGame, setCurrentGame] = useState('Tetris');

    function handleButtonClick() {
        setCurrentGame(currentGame === 'Tetris' ? 'Space Invaders' : 'Tetris');
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
                <h1 className='streamer'>Shotgun247 Playing Space Invaders</h1>
                <div className='button--container1'>
                    <Link to={'/SpaceInvaders'}> <button className="card-button-play">Play Now</button></Link>
                    <Link to={'/ActiveStreams'}> <button className="card-button">Watch Now</button></Link>
                </div>

            </div>

            <div className='sidebar2'>
                <h1 className='sidebar2--text'>Games List</h1>
                {currentGame === 'Tetris' && (
                    <div className="card2">
                        <img className="card-img2" src={TetrisImg} alt="Thumbnail" />
                        <div className="card-body">
                            <h2 className="card-title">Tetris</h2>
                            <div className='button--container2'>
                                <Link to={'/Tetris'}><button className="card-button-play">Play Now</button></Link>
                            </div>
                        </div>
                    </div>
                )}
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
                <button className='switchgame-button' onClick={handleButtonClick}>Switch Game</button>
            </div>

        </>
    );
}

export default HomePage;
