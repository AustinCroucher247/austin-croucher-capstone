import { defaultCell } from "./Cell";
import { transferToBoard } from "./Tetriminoes";

export const buildBoard = ({ rows, columns }) => {
    console.log({ rows })

    const builtRows = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({ ...defaultCell }))
    );

    return {
        rows: builtRows,
        size: { rows, columns }
    };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
    const { tetrimino, position } = player;

    let rows = board.rows.map((row) =>
        row.map((cell) => (cell.occupued ? cell : { ...defaultCell }))
    );

    rows = transferToBoard({
        className: tetrimino.className,
        isOccupied: player.collided,
        position,
        rows,
        shape: tetrimino.shape
    });

    return {
        rows,
        size: { ...board.size }
    };
};