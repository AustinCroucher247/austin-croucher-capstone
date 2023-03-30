import './HomePage.scss'
import Header from '../Header/Header';
import SpaceInvaders from '../../assets/spaceinvaders.jpg'

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
                            <button className="card-button-play">Play Now</button>
                            <button className="card-button">Watch Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;