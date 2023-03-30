import './HomePage.scss'
import HeaderLogo from '../../assets/RetroGames.jpg'

function HomePage() {
    return (
        <div>
            <header className='header'>
                <img className='header--logo' src={HeaderLogo} alt="" />
                <div className='header--logo--right'></div>
            </header>

        </div>
    );
}

export default HomePage;



