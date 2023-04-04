import GameComponent from '../SpaceInvaders/GameMountComp.js';
import { useState, useEffect } from 'react';
import './SpaceGamePage.scss';
import Header from '../Header/Header.jsx';
import { useRef } from 'react';
import axios from 'axios';

function SpaceGamePage() {
    const [renderGame, setRenderGame] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [score, setScore] = useState(0)
    const [showGameOverModal, setShowGameOverModal] = useState(false);

    const scoreRef = useRef(0);


    const handleScore = (score, game) => {
        scoreRef.current += score;
        setScore(scoreRef.current);
    };

    const startGame = () => {
        setShowModal(false);
        setRenderGame(true);
    };



    const postScore = async () => {
        const username = localStorage.getItem('username') || 'Guest';
        const randomSuffix = Math.floor(Math.random() * 10000);
        const uniqueUsername = username === 'Guest' ? 'Guest' + randomSuffix.toString() : username;
        const data = { username: uniqueUsername, score: scoreRef.current };

        try {
            const response = await axios.post('http://localhost:8080/leaderboard', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await fetch('http://localhost:8080/leaderboard');
                const data = await response.json();
                setLeaderboardData(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchLeaderboard();
    }, []);

    return (
        <div>
            <Header />
            {showModal && (
                <div className='modal--container'>
                    <div className='modal--content'>
                        <h2 className='modal--title'>Space Invaders</h2>
                        <p className='modal--description'>
                            Are you ready to defend Earth against an alien invasion?
                        </p>
                        <div className='modal--button--container'>
                            <button className='modal--button' onClick={startGame}>
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='heading--container'>
                {/* <img className='heading--text' src={SpaceInvaderLogo} alt="logo" /> */}
            </div>
            <p className='score'>{showModal ? "" : 'Score: ' + score}</p>
            <div className='game--container'>
                {renderGame && (
                    <>
                        <GameComponent handleScore={handleScore} postScore={postScore} setShowGameOverModal={setShowGameOverModal} />
                        <div className='leaderboard--container'>
                            <h1 className='leaderboard--text'>Leaderboard</h1>
                            <table className='leaderboard'>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboardData.slice(0, 8).map((entry, index) => (
                                        <tr key={entry.id}>
                                            <td>{index + 1}</td>
                                            <td>{entry.username}</td>
                                            <td>{entry.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {
                            showGameOverModal && (
                                <div className="game-over-modal">
                                    <div className="modal-content1">
                                        <h2>Game Over</h2>
                                        <p>Your score was posted to the leaderboard.</p>
                                        <button onClick={() => {
                                            setShowGameOverModal(false);
                                            window.location.reload();
                                        }}>Close</button>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )}
            </div>
        </div>
    );
}

export default SpaceGamePage;