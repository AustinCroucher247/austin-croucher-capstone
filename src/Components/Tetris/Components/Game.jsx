import Menu from "./Menu";
import { useGameOver } from "../Hooks/useGameOver.js"
import Tetris from "./Tetris";

function Game({ rows, columns }) {
    const [gameOver, setGameOver, resetGameOver] = useGameOver()
    const start = () => {
        resetGameOver();
        console.log(`start gameOver is ${gameOver}`)
    }
    return (
        <div className="game">
            {gameOver ? (
                <Menu onClick={start} />
            ) : (
                <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
            )}
        </div>
    );
};

export default Game;