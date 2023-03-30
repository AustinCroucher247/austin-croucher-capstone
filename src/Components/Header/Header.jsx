import './Header.scss'
import HeaderLogo from '../../assets/RetroGames.jpg'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <div className='header--container'>
                <header className='header'>
                    <Link to="/HomePage" style={{ textDecoration: 'none' }}>
                        <img className='header--logo' src={HeaderLogo} alt="" />
                    </Link>

                    <div className='header--logo--right'>
                        <nav>
                            <ul className='list'>
                                <Link to={'/HomePage'}>
                                    <li className='list--item'>
                                        Home
                                    </li>
                                </Link>
                                <Link to={'/GameRoom'}>
                                    <li className='list--item'>
                                        Game Room
                                    </li>
                                </Link>
                                <Link to={'/ActiveStreams'}>
                                    <li className='list--item'>
                                        Active Streams
                                    </li>
                                </Link>
                                <Link to={'/Leaderboards'}>
                                    <li className='list--item'>
                                        Leaderboards
                                    </li>
                                </Link>
                                <Link to={'/AboutUs'}>
                                    <li className='list--item'>
                                        About us
                                    </li>
                                </Link>
                                <div className='list--item--login'>
                                    <Link to={'/Login'} className='login'>
                                        Login
                                    </Link>
                                </div>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;