import '.././ActivePacMan.scss'
import Board from "./Board";
import { useBoard } from '../Hooks/useBoard';
import GameStats from './GameStats';
import { useGameStats } from '../Hooks/useGameStats';
import Previews from './Previews';
import { usePlayer } from '../Hooks/usePlayer';





function Tetris({ rows, columns, setGameOver }) {
    const [gameStats, addLinesCleared] = useGameStats();
    const [board, setBoard] = useBoard({ rows, columns })
    const [player, setPlayer, resetPlayer] = usePlayer();

    return (
        <div className='tetris'>
            <Board board={board} />
            <GameStats gameStats={gameStats} />
            <Previews tetrominoes={player.tetrominoes} />
        </div>

    );
};

export default Tetris;  