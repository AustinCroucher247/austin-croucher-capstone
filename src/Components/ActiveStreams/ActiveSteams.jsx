import './ActiveStreams.scss'
import Header from '../Header/Header';
import PacMan from '../../assets/PacMan.png'
import SpaceInvaders from '../../assets/spaceinvaders.jpg'
import { Link } from 'react-router-dom';


function ActiveStreams() {
    return (
        <div>
            <Header />
            <h1 className='header--text'>Active Streams</h1>
            <div className='activecard--container'>
                <div className="active--card1">
                    <img className="activecard-img2" src={PacMan} alt="Thumbnail" />
                    <div className="activecard-body">
                        <h2 className="activecard-title">Pac-man</h2>
                        {/* <Link to={'/ActiveStreams/PacMan'}> <button className="card-button">Watch Now</button></Link> */}
                    </div>
                </div>
                <div className="active--card2">
                    <img className="activecard-img2" src={SpaceInvaders} alt="Thumbnail" />
                    <div className="activecard-body">
                        <h2 className="activecard-title">Space Invaders</h2>
                        <Link to={'/ActiveStreams/SpaceInvaders'}> <button className="card-button">Watch Now</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveStreams;



