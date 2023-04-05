import './Header.scss'
import HeaderLogo from '../../assets/RetroGames.jpg'
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

function Header() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, []);
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
                                <Link to={'/HomePage'} style={{ textDecoration: 'none' }}>
                                    <li className='list--item'>
                                        Home
                                    </li>
                                </Link>
                                <Link to={'/GameRoom'} style={{ textDecoration: 'none' }}>
                                    <li className='list--item'>
                                        Game Room
                                    </li>
                                </Link>
                                <Link to={'/ActiveStreams'} style={{ textDecoration: 'none' }}>
                                    <li className='list--item'>
                                        Active Streams
                                    </li>
                                </Link>
                                <Link to={'/Leaderboards'} style={{ textDecoration: 'none' }}>
                                    <li className='list--item'>
                                        Leaderboards
                                    </li>
                                </Link>
                                <Link to={'/AboutUs'} style={{ textDecoration: 'none' }}>
                                    <li className='list--item'>
                                        About us
                                    </li>
                                </Link>
                                <div className='list--item--login'>
                                    {username ? (
                                        <Link to={'/UserPage'} className='username'>
                                            User: {username}
                                        </Link>
                                    ) : (

                                        <Link to={'/Login'} className='login'>
                                            Login
                                        </Link>
                                    )}
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