import React from "react";
import '.././ActivePacMan.scss'

import { buildBoard } from "../Logic/Board";
import { transferToBoard } from "../Logic/Tetriminoes.jsx";

import BoardCell from "./BoardCell";



const Preview = ({ tetrimino, index }) => {
    const { shape, className } = tetrimino;

    const board = buildBoard({ rows: 4, columns: 4 });
    const style = { top: `${index * 15}vw` };


    board.rows = transferToBoard({
        className,
        isOccupied: false,
        position: { row: 0, column: 0 },
        rows: board.rows,
        shape
    });

    return (

        <div className="preview" style={style}>
            <div className="preview--board">
                {board.rows.map((row, y) =>
                    row.map((cell, x) => (
                        <BoardCell key={x * board.size.columns + x} cell={cell} />
                    ))
                )}

            </div>


        </div>
    )

}

export default Preview;

