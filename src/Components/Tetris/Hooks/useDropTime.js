import { useState, useCallback, useEffect } from "react"

const deafultDropTime = 900;
const minimumDropTime = 100;
const speedIncrement = 150;



export const useDropTime = ({ gameStats }) => {
    const [dropTime, setDropTime] = useState(deafultDropTime)
    const [previousDropTime, setPreviousDropTime] = useState();

    const resumeDropTime = useCallback(() => {
        if (!previousDropTime) {
            return;
        }
        setDropTime(previousDropTime);
        setPreviousDropTime(null);
    }, [previousDropTime])

    const pauseDropTime = useCallback(() => {
        if (dropTime) {
            setPreviousDropTime(dropTime);
        }
        setDropTime(null);
    }, [dropTime, setPreviousDropTime]);

    useEffect(() => {
        const speed = speedIncrement * (gameStats.level - 1);
        const newDropTime = Math.max(deafultDropTime - speed, minimumDropTime);

        setDropTime(newDropTime);
    }, [gameStats.level, setDropTime])

    return [dropTime, pauseDropTime, resumeDropTime]

}