import { useState, useCallback } from "react";

import { randomTetrimino } from "../Logic/Tetriminoes";

const buildPlayer = (previous) => {

};

export const usePlayer = () => {
    const [player, setPlayer] = useState(buildPlayer());

    const resetPlayer = useCallback(() => {
        setPlayer((prev) => buildPlayer(prev));
    }, []);

    return [player, setPlayer, resetPlayer];
}