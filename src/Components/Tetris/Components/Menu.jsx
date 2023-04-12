import { useState } from "react";

function Menu({ onClick }) {
    // eslint-disable-next-line
    const [showModal, setShowModal] = useState(true);

    return (
        <div className="menu">
            {showModal && (
                <div className='modal--container'>
                    <div className='modal--content'>
                        <h2 className='modal--title'>Play Tetris</h2>
                        <p className='modal--description'>
                            Tetris description
                        </p>
                        <div className='modal--button--container'>
                            <button className='modal--button' onClick={onClick}>
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;