import '.././ActiveTetris.scss'
import Previews from './Previews';
import GameStats from './GameStats';
import Board from "./Board";
import GameController from './GameController';

import { useBoard } from '../Hooks/useBoard';
import { useGameStats } from '../Hooks/useGameStats';
import { usePlayer } from '../Hooks/usePlayer';
import { useEffect } from 'react';






function Tetris({ rows, columns, setGameOver }) {
    const [gameStats, addLinesCleared] = useGameStats();
    const [player, setPlayer, resetPlayer] = usePlayer();

    // eslint-disable-next-line
    const [board, setBoard] = useBoard({
        rows,
        columns,
        player,
        resetPlayer,
        addLinesCleared
    });

    function preventAllKeysScroll(e) {
        e.preventDefault();
    }

    useEffect(() => {
        document.addEventListener('keydown', preventAllKeysScroll);
        return () => {
            document.removeEventListener('keydown', preventAllKeysScroll);
        };
    }, []);

    return (
        <div className='tetris'>
            <Board board={board} />
            <GameStats gameStats={gameStats} />
            <Previews tetriminoes={player.tetriminoes} />
            <GameController
                board={board}
                gameStats={gameStats}
                player={player}
                setGameOver={setGameOver}
                setPlayer={setPlayer}
            />
        </div>

    );
};

export default Tetris;  