import GameComponent from '../SpaceInvaders/GameMountComp.js';
import { useState, useEffect } from 'react';
import './SpaceGamePage.scss';
import Header from '../Header/Header.jsx';
import { useRef } from 'react';

function SpaceGamePage() {
    const [renderGame, setRenderGame] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [score, setScore] = useState(0)
    const scoreRef = useRef(0);


    const handleScore = (score) => {
        // make api call to set high score
        scoreRef.current += score
        setScore(scoreRef.current)

        console.log(`received new high score ${scoreRef.current}`);
    }
    const startGame = () => {
        setShowModal(false);
        setRenderGame(true);
    };

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await fetch('http://localhost:8080/leaderboard');
                const data = await response.json();
                console.log(response.data)
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
                        <GameComponent handleScore={handleScore} />
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
                                    {leaderboardData.map((entry, index) => (
                                        <tr key={entry.id}>
                                            <td>{index + 1}</td>
                                            <td>{entry.username}</td>
                                            <td>{entry.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SpaceGamePage;