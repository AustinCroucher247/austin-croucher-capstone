import '.././ActiveTetris.scss'
import { Action, actionForKey, actionIsDrop } from "../Logic/Input";
import { playerController } from '../Logic/PlayerController';
import { useInterval } from '../Hooks/useInterval'
import { useDropTime } from '../Hooks/useDropTime'

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
        playerController({
            action,
            board,
            player,
            setPlayer,
            setGameOver
        });
    };

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