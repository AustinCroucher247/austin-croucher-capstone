import '.././ActiveTetris.scss'
import { Action, actionForKey, actionIsDrop } from "../Logic/Input";
import { playerController } from '../Logic/PlayerController';
import { useInterval } from '../Hooks/useInterval'
import { useDropTime } from '../Hooks/useDropTime'
import axios from 'axios';

const GameController = ({
    board,
    gameStats,
    player,
    setGameOver,
    setPlayer
}) => {


    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
        gameStats
    });

    const postScore = async () => {
        const username = localStorage.getItem('username') || 'Guest';
        const randomSuffix = Math.floor(Math.random() * 10000);
        const uniqueUsername = username === 'Guest' ? 'Guest' + randomSuffix.toString() : username;
        const data = { username: uniqueUsername, score: gameStats.points };

        try {
            const response = await axios.post('https://austin-croucher-retro-rumble.herokuapp.com/tetris/leaderboard', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useInterval(() => {
        handleInput({ action: Action.SlowDrop })
    }, dropTime)


    const onKeyUp = ({ code }) => {
        const action = actionForKey(code);
        if (actionIsDrop(action)) {
            resumeDropTime();
        }
    };

    const onKeyDown = ({ code }) => {
        const action = actionForKey(code);

        if (action === Action.Pause) {
            if (dropTime) {
                pauseDropTime();
            } else {
                resumeDropTime();
            }
        } else if (action === Action.Quit) {
            setGameOver(true);
        } else {
            if (actionIsDrop(action)) pauseDropTime();
            handleInput({ action })
        }
    };

    const handleInput = ({ action }) => {
        if (!action) return false;

        if (action === Action.Rotate) {
            attemptRotation(board, player, setPlayer);
            return false;
        } else {
            attemptMovement({ board, player, setPlayer, action, setGameOver });

            // Check if the game is over
            const isGameOver = player.collided && player.position.row === 0;
            if (isGameOver) {
                setGameOver(isGameOver);
                return true;
            }
        }

        return false;
    };

    useEffect(() => {
        if (gameStats.gameOver) {
            postScore();
        }
    }, [gameStats.gameOver]);

    return (
        <input
            className="GameController"
            type="text"
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            autoFocus
        />
    );
};

export default GameController;