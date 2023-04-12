import './ActivePacMan.scss'
import Header from '../Header/Header';
import Game from './Components/Game.jsx'


function ActivePacMan() {
    return (
        <div>
            <Header />
            <Game rows={20} columns={10} />
        </div>
    );
}

export default ActivePacMan;



