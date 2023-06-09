import axios from 'axios';
import './Leaderboards.scss';
import Header from '../Header/Header';
import TetrisLeaderbord from '../Tetris/Components/TetrisLeaderboard'
import { useState, useEffect } from 'react';

function Leaderboards({ username }) {
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await axios.get('https://austin-croucher-retro-rumble.herokuapp.com/leaderboard', {
                    params: {
                        username: username
                    }
                });
                setLeaderboardData(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchLeaderboard();
    }, [username]);

    return (
        <div>
            <Header />
            <div className='leaderboards--container'>
                <div className='flex'>
                    <div className='container--leaderboard'>
                        <div className='leaderboard--container11'>
                            <h1 className='leaderboard--text'>Leaderboard</h1>
                            <h2 className='leaderboard--text'>Space Invaders</h2>

                            {leaderboardData ? (
                                <table className='leaderboard' id='leaderboard'>
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Player Name</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboardData.slice(0, 45).map((entry, index) => (
                                            <tr key={entry.id} style={entry.username === username ? { fontWeight: 'bold' } : {}}>
                                                <td>{index + 1}</td>
                                                <td>{entry.username}</td>
                                                <td>{entry.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            ) : (
                                <p>Loading leaderboard data...</p>
                            )}
                        </div>
                    </div>
                </div>
                <TetrisLeaderbord />
            </div>
        </div>
    );
}

export default Leaderboards;