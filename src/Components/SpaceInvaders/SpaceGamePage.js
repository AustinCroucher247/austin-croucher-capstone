import GameComponent from '../SpaceInvaders/GameMountComp.js';
import { useState } from 'react';
import './SpaceGamePage.scss';
import Header from '../Header/Header.jsx';
import SpaceInvaderLogo from '../../assets/SpaceInvadersText.png';

function SpaceGamePage() {
    const [renderGame, setRenderGame] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const startGame = () => {
        setShowModal(false);
        setRenderGame(true);
    };

    return (
        <div>
            <Header />
            {showModal && (
                <div className='modal--container'>
                    <div className='modal--content'>
                        <h2 className='modal--title'>Space Invaders</h2>
                        <p className='modal--description'>Are you ready to defend Earth against an alien invasion?</p>
                        <div className='modal--button--container'>
                            <button className='modal--button' onClick={startGame}>Start</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='heading--container'>
                {/* <img className='heading--text' src={SpaceInvaderLogo} alt="logo" /> */}
            </div>

            <div className='game--container'>
                {renderGame && (
                    <>
                        <GameComponent />
                        <div className='leaderboard--container'>
                            <h1 className='leaderboard--text'>Leaderboard</h1>
                            <table className="leaderboard">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Player A</td>
                                        <td>5000</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Player B</td>
                                        <td>4000</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Player C</td>
                                        <td>3500</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Player D</td>
                                        <td>3000</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Player E</td>
                                        <td>2500</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {/* <div className='button--container'>
                <button onClick={() => setRenderGame(!renderGame)}>Toggle game</button>
            </div> */}

        </div>
    );
}

export default SpaceGamePage;
