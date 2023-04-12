import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TetrisLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('https://austin-croucher-retro-rumble.herokuapp.com/tetris/leaderboard');
            setLeaderboard(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2 className='leaderboard--text--tetris'>Leaderboard</h2>
            <h2 className='leaderboard--text--tetris'>Tetris</h2>

            <table className='leaderboard' id='leaderboard'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={index} style={entry.username === username ? { fontWeight: 'bold' } : {}}>
                            <td>{index + 1}</td>
                            <td>{entry.username}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TetrisLeaderboard;