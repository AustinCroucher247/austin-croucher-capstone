import { useState, useCallback, useEffect, useRef } from "react";
import lineClearMusic from '../../../assets/audio/clear.wav'
// import brickDropMusic from '../../../assets/audio/se_game_landing.wav'
import tetrisMusic from '../../../assets/audio/se_game_tetris.wav'


const buildGameStats = () => ({

    level: 1,
    linesCompleted: 0,
    linesPerLevel: 10,
    points: 0
});

export const useGameStats = () => {
    const [gameStats, setGameStats] = useState(buildGameStats());
    const [showTetrisMessage, setShowTetrisMessage] = useState(false);
    const lineClearedAudioRef = useRef(new Audio(lineClearMusic));
    const tetrisAudioRef = useRef(new Audio(tetrisMusic));


    const addLinesCleared = useCallback((lines) => {
        if (lines > 0) {
            lineClearedAudioRef.current.play();
        }
        setGameStats((previous) => {
            let pointsEarned;
            switch (lines) {
                case 1:
                    pointsEarned = 40;
                    break;
                case 2:
                    pointsEarned = 100;
                    break;
                case 3:
                    pointsEarned = 300;
                    break;
                case 4:
                    pointsEarned = 1200;
                    break;
                default:
                    pointsEarned = 0;
            }
            const points = previous.points + pointsEarned;
            const { linesPerLevel } = previous;
            const newLinesCompleted = previous.linesCompleted + lines;
            const level =
                newLinesCompleted >= linesPerLevel
                    ? previous.level + 1
                    : previous.level;
            const linesCompleted = newLinesCompleted % linesPerLevel;
            return {
                level,
                linesCompleted,
                linesPerLevel,
                points
            }
        });
        if (lines === 4) {
            setShowTetrisMessage(true);
        }
    }, []);

    useEffect(() => {
        if (showTetrisMessage) {
            tetrisAudioRef.current.play();
        }
        if (showTetrisMessage) {
            const timeout = setTimeout(() => {
                setShowTetrisMessage(false);
            }, 3000); // 3 seconds
            return () => clearTimeout(timeout);
        }
    }, [showTetrisMessage]);

    return [gameStats, addLinesCleared, showTetrisMessage, tetrisAudioRef];
}