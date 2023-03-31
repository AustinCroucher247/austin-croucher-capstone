import game from "../SpaceInvaders/SpaceGame.js";
import { useRef, useEffect } from 'react';

const GameComponent = props => {
    const canvasRef = useRef();
    const scoreRef = useRef();

    const handleHighScore = (highScore) => {
        // make api call to set high score
        console.log(`received new high score ${highScore}`);
    }

    useEffect(() => {
        game.mount(canvasRef.current, scoreRef.current, handleHighScore);

        return () => {
            game.unmount();
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} />
            <p ref={scoreRef}></p>

        </>
    );
};

export default GameComponent;