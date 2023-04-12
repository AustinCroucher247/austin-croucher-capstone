import '.././ActiveTetris.scss'
import BoardCell from './BoardCell.jsx'

function Board({ board }) {
    console.log("board", board)

    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    };

    return (

        <div className='board' style={boardStyles}>
            {board.rows.map((row, y) =>
                row.map((cell, x) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
            )}

        </div>


    )


};

export default Board;