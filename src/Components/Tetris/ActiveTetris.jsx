import '../Tetris/ActiveTetris.scss'
import Header from '../Header/Header';
import Game from './Components/Game.jsx'


function ActiveTetris() {
    return (
        <div>
            <Header />
            <Game rows={20} columns={10} />
        </div>
    );
}

export default ActiveTetris;



