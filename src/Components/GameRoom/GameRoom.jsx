import Header from '../Header/Header';
import './GameRoom.scss'
import { Link } from 'react-router-dom';
import PacMan from '../../assets/PacMan.png'



function GameRoom() {
    return (
        <div>
            <Header />
            <div className='page--container'>
                <div className='sidebar'>
                    <h1 className='sidebar--text'>Featured Game</h1>
                    <div className="card">
                        <img className="card-img" src={PacMan} alt="Thumbnail" />
                        <div className="card-body">
                            <h2 className="card-title">Pac-Man</h2>
                            <p className="card-text">Pac-Man is a classic arcade game that features a yellow character eating dots while avoiding ghosts in a never-ending maze.</p>
                            <div className='button--container'>
                                <Link to={'/SpaceInvaders'}> <button className="card-button-play">Play Now</button></Link>
                                <Link to={'/ActiveStreams'}> <button className="card-button">Watch Now</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GameRoom;



