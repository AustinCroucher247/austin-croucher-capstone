import ".././ActiveTetris.scss";
import { Action, actionForKey, actionIsDrop } from "../Logic/Input";
import { playerController } from "../Logic/PlayerController";
import { useInterval } from "../Hooks/useInterval";
import { useDropTime } from "../Hooks/useDropTime";
import axios from "axios";
import { useEffect } from "react";

const GameController = ({
    board,
    gameStats,
    player,
    setGameOver,
    setPlayer,
}) => {
    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
        gameStats,
    });
    // eslint-disable-next-line
    const postScore = async () => {
        const username = localStorage.getItem("username") || "Guest";
        const randomSuffix = Math.floor(Math.random() * 10000);
        const uniqueUsername =
            username === "Guest"
                ? "Guest" + randomSuffix.toString()
                : username;
        const data = { username: uniqueUsername, score: gameStats.points };

        try {
            const response = await axios.post(
                "https://austin-croucher-retro-rumble.herokuapp.com/tetris/leaderboard",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (gameStats.gameOver) {
            console.log('Game Over');
            postScore();
            setGameOver(false); // Reset the gameOver state
        }
    }, [gameStats.gameOver, postScore, setGameOver]);

    useInterval(() => {
        handleInput({ action: Action.SlowDrop });
    }, dropTime);

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
            handleInput({ action });
        }
    };

    const handleInput = ({ action }) => {
        const isGameOver = playerController({
            action,
            board,
            player,
            setPlayer,
            onGameOver: (gameOver) => {
                setGameOver(gameOver);
                postScore();
            },
        });

        if (isGameOver) {
            console.log('Game Over or Player Quit');
            postScore();
        }
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