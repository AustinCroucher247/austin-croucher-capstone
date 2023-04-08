import './Header.scss';
import HeaderLogo from '../../assets/RetroGames.jpg';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

function Header() {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        setAvatar(localStorage.getItem('avatar'));
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
                                {/* <Link to={'/GameRoom'} style={{ textDecoration: 'none' }}>
                                    <li className='list--item'>
                                        Game Room
                                    </li>
                                </Link> */}
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

                                <div className='list--item--login'>
                                    {username ? (
                                        <div className='username-container'>
                                            {avatar && <img className='header--avatar' src={avatar} alt='User Avatar' />}
                                            <Link to={'/UserPage'} className='username'>
                                                User: {username}
                                            </Link>
                                        </div>
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