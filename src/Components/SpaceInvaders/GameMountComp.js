import game from "../SpaceInvaders/SpaceGame.js";
import { useRef, useEffect } from 'react';

const GameComponent = props => {
    const canvasRef = useRef();
    const scoreRef = useRef();


    useEffect(() => {
        // eslint-disable-next-line
        game.mount(canvasRef.current, scoreRef.current, props.handleScore, props.postScore, props.setShowGameOverModal, props.socketRef, props.player);

        return () => {
            game.unmount();
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <canvas ref={canvasRef} />
            {console.log(canvasRef)}

        </>
    );
};

export default GameComponent;