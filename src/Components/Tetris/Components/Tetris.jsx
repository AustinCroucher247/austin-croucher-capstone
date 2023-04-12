import '.././ActivePacMan.scss'
import Previews from './Previews';
import GameStats from './GameStats';
import Board from "./Board";

import { useBoard } from '../Hooks/useBoard';
import { useGameStats } from '../Hooks/useGameStats';
import { usePlayer } from '../Hooks/usePlayer';





function Tetris({ rows, columns, setGameOver }) {
    const [gameStats, addLinesCleared] = useGameStats();
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [board, setBoard] = useBoard({
        rows,
        columns,
        player,
        resetPlayer,
        addLinesCleared
    });


    return (
        <div className='tetris'>
            <Board board={board} />
            <GameStats gameStats={gameStats} />
            <Previews tetriminoes={player.tetriminoes} />
        </div>

    );
};

export default Tetris;  