import game from "../SpaceInvaders/SpaceGame.js";
import { useRef, useEffect } from 'react';

const GameComponent = props => {
    const canvasRef = useRef();
    const scoreRef = useRef();



    useEffect(() => {
        game.mount(canvasRef.current, scoreRef.current, props.handleScore);

        return () => {
            game.unmount();
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} />
            {console.log(canvasRef)}

        </>
    );
};

export default GameComponent;