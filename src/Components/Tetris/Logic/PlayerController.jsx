import { Action } from "./Input";
import { hasCollision, isWithinBoard } from "./Board"
import { rotate } from "./Tetriminoes";


const attemptRotation = (board, player, setPlayer) => {
    const shape = rotate({
        piece: player.tetrimino.shape,
        direction: 1
    });

    const position = player.position;
    const isValidRotation =
        isWithinBoard({ board, position, shape }) &&
        !hasCollision({ board, position, shape });

    if (isValidRotation) {
        setPlayer({
            ...player,
            tetrimino: {
                ...player.tetrimino,
                shape
            }
        });
    } else {
        return false
    }
}






export const playerController = ({
    action,
    board,
    player,
    setPlayer,
    setGameOver
}) => {
    if (!action) return;
    if (action === Action.Rotate) {
        attemptRotation(board, player, setPlayer)
    }
};