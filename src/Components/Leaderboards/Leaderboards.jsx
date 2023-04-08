import axios from 'axios';
import './Leaderboards.scss';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';

function Leaderboards({ username }) {
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await axios.get('http://localhost:8080/leaderboard', {
                    params: {
                        username: username
                    }
                });
                setLeaderboardData(response.data);
            } catch (err) {
                console.error(err);
                // Handle the error here
            }
        }

        fetchLeaderboard();
    }, [username]);

    return (
        <div>
            <Header />
            <div className='container--leaderboard'>
                <div className='leaderboard--container1'>
                    <h1 className='leaderboard--text'>Leaderboard</h1>
                    <h2 className='leaderboard--text'>Space Invaders</h2>

                    {leaderboardData ? (
                        <table className='leaderboard'>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Player Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.slice(0, 15).map((entry, index) => (
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
    );
}

export default Leaderboards;