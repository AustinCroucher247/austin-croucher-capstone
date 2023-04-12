import Header from '../Header/Header';
import './GameRoom.scss'
import { Link } from 'react-router-dom';
import Tetris from '../../assets/tetris.jpg';
import SpaceInvaders from '../../assets/spaceinvaders.jpg'


function GameRoom() {
    return (
        <div>
            <Header />
            <div className='page--container'>
                <div className='sidebar'>
                    <h1 className='sidebar--text'>Featured Game</h1>
                    <div className="card">
                        <img className="card-img" src={Tetris} alt="Thumbnail" />
                        <div className="card-body">
                            <h2 className="card-title">Tetris</h2>
                            <p className="card-text"> Tetris is a classic video game where players arrange falling shapes to create horizontal lines without gaps, scoring points as the difficulty increases. </p>

                            <div className='button--container'>
                                <Link to={'/Tetris'}> <button className="card-button-play">Play Now</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='activecard--container1'>
                    <div className="active--card2">
                        <img className="activecard-img2" src={SpaceInvaders} alt="Thumbnail" />
                        <div className="activecard-body">
                            <h2 className="activecard-title">Space Invaders</h2>
                            <Link to={'/SpaceInvaders'}> <button className="card-button-play">Play Now</button></Link>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GameRoom;



