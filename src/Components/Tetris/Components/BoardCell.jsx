import '.././ActivePacMan.scss'

const BoardCell = ({ cell }) => (
    <div className={`BoardCell ${cell.className}`}>
        <div className="sparkle"></div>

    </div>
)

export default BoardCell;