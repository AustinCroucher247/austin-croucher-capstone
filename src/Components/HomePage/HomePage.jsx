import './HomePage.scss'
import HeaderLogo from '../../assets/RetroGames.jpg'
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <div className='header--container'>
                <header className='header'>
                    <Link to="./" style={{ textDecoration: 'none' }}>
                        <img className='header--logo' src={HeaderLogo} alt="" />
                    </Link>

                    <div className='header--logo--right'>
                        <nav>
                            <ul className='list'>
                                <Link to={'./'} >
                                    <li className='list--item'>
                                        Home
                                    </li>
                                </Link>
                                <li className='list--item'>
                                    Game Room
                                </li>
                                <li className='list--item'>
                                    Active Streams
                                </li>
                                <li className='list--item'>
                                    Leaderboards
                                </li>
                                <li className='list--item'>
                                    About us
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>

        </div >
    );
}

export default HomePage;



