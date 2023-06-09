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

export const movePlayer = ({ delta, position, shape, board }) => {
    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column
    };

    const collided = hasCollision({
        board,
        position: desiredNextPosition,
        shape
    });

    const isOnBoard = isWithinBoard({
        board,
        position: desiredNextPosition,
        shape
    });

    const presentMove = !isOnBoard || (isOnBoard && collided);
    const nextPosition = presentMove ? position : desiredNextPosition;

    const isMovingDown = delta.row > 0;
    const isHit = isMovingDown && (collided || !isOnBoard);

    return { collided: isHit, nextPosition }
};


const attemptMovement = ({
    board,
    action,
    player,
    setPlayer,
    onBlockPlaced,
    onGameOver,
    onBrickPlaced // Add the onBrickPlaced parameter
}) => {
    const delta = { row: 0, column: 0 };
    let isFastDropping = false;

    if (action === Action.FastDrop) {
        isFastDropping = true;
    } else if (action === Action.SlowDrop) {
        delta.row += 1;
    } else if (action === Action.Left) {
        delta.column -= 1;
    } else if (action === Action.Right) {
        delta.column += 1;
    }

    const { collided, nextPosition } = movePlayer({
        delta,
        position: player.position,
        shape: player.tetrimino.shape,
        board
    });

    const isGameOver = collided && player.position.row === 0;
    if (isGameOver) {
        onGameOver(isGameOver);
    } else if (collided && onBrickPlaced) { // Add this condition to call onBrickPlaced when the brick has collided
        onBrickPlaced();
    }

    setPlayer({
        ...player,
        collided,
        isFastDropping,
        position: nextPosition
    });
};



export const playerController = ({
    action,
    board,
    player,
    setPlayer,
    onGameOver,
    onBlockPlaced
}) => {
    if (!action) return;

    if (action === Action.Rotate) {
        attemptRotation(board, player, setPlayer);
    } else {
        attemptMovement({ board, player, setPlayer, action, onGameOver });

        // Check if the game is over
        const isGameOver = player.collided && player.position.row === 0;
        if (isGameOver) {
            onGameOver(isGameOver);
            return true;
        }
    }

    return false;
};