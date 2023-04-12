import { useState, useRef } from "react";
import spaceKeys from '../../../assets/101-1017248_parallel-hd-png-download-removebg-preview.png'
import arrows from '../../../assets/arrows-removebg-preview.png'
import tetrisTheme from '../../../assets/audio/Tetris.mp3'

function Menu({ onClick }) {
    const audioRef = useRef(new Audio(tetrisTheme));

    // eslint-disable-next-line
    const [showModal, setShowModal] = useState(true);
    // eslint-disable-next-line
    const [showControls, setShowControls] = useState(true)
    const handleButtonClick = () => {
        audioRef.current.play();
        onClick();
    };

    return (
        <div className="menu">
            {showModal && (
                <div className='modal--container3'>
                    <div className='modal--content'>
                        <h2 className='modal--title'>Play Tetris</h2>
                        <p className='modal--description'>
                            Tetris is a classic video game where players arrange falling shapes to create horizontal lines without gaps, scoring points as the difficulty increases.                        </p>
                        <div className='modal--button--container'>
                            <button className='modal--button' onClick={handleButtonClick}>
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showControls && (
                <div className='modal--container2'>
                    <div className='modal--content'>
                        <h2 className='modal--title'>Tetris Controls</h2>
                        <p className='modal--description'>
                            <div className='controls-container'>
                                <div className='arrows-flex'>
                                    <img className='updownleftright' src={arrows} alt='WASD keys' />
                                    <p>.................................................</p>
                                    <div className="controls--container">
                                        <h6>Up: Change Direction</h6>
                                        <h6> Left: Move Left</h6>
                                        <h6>Right: Move Right</h6>
                                        <h6>Down: Move Piece Down</h6>
                                    </div>
                                </div>
                                <div className='space-flex'>
                                    <img className='space' src={spaceKeys} alt='Space key' />
                                    <p>..................................................................</p>
                                    <h5>INSTANT DROP!</h5>

                                </div>
                            </div>
                        </p>
                        <div className='modal--button--container'>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Menu;