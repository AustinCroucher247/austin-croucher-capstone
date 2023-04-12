import '../Tetris/ActiveTetris.scss';
import Header from '../Header/Header';
import Game from './Components/Game.jsx';
import TetrisLeaderboard from './Components/TetrisLeaderboard.jsx';

function ActiveTetris() {
    return (
        <div>
            <Header />
            <div className='tetris--container'>
                <div className="ActiveTetris-container">
                    <Game rows={20} columns={10} />
                    <TetrisLeaderboard />
                </div>
            </div>
        </div>
    );
}

export default ActiveTetris;