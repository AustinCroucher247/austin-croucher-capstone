import './HomePage.scss'
import Header from '../Header/Header';
import SpaceInvaders from '../../assets/spaceinvaders.jpg'
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <Header />
            <div className='sidebar'>
                <h1 className='sidebar--text'>Featured Game</h1>
                <div className="card">
                    <img className="card-img" src={SpaceInvaders} alt="Thumbnail" />
                    <div className="card-body">
                        <h2 className="card-title">Space Invaders</h2>
                        <p className="card-text">Space Invaders is a classic arcade video game where players control a laser cannon to defend Earth against waves of invading aliens.</p>
                        <div className='button--container'>
                            <Link to={'/SpaceInvaders'}> <button className="card-button-play">Play Now</button></Link>
                            <Link to={'/ActiveStreams'}> <button className="card-button">Watch Now</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* <h1 className='promoted--stream--header'>Promoted Stream</h1> */}
                {/* <video src="../../assets/SpaceInvaderVideo.mp4" controls></video> */}
            </div>
        </>
    );
}

export default HomePage;