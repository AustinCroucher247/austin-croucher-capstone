import { useState, useCallback } from "react";

import { randomTetrimino } from "../Logic/Tetriminoes";

const buildPlayer = (previous) => {
    let tetriminoes;

    if (previous) {
        tetriminoes = [...previous.tetriminoes];
        tetriminoes.unshift(randomTetrimino());
    } else {
        tetriminoes = Array(5)
            .fill(0)
            .map((_) => randomTetrimino())
    }

    return {
        collided: false,
        isFastDropping: false,
        position: { row: 0, column: 4 },
        tetriminoes,
        tetrimino: tetriminoes.pop()
    };
};

export const usePlayer = () => {
    const [player, setPlayer] = useState(buildPlayer());

    const resetPlayer = useCallback(() => {
        setPlayer((prev) => buildPlayer(prev));
    }, []);

    return [player, setPlayer, resetPlayer];
}