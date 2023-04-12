import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

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
        <div className="leaderboard--container">
            <h2 lassName='leaderboard--text'>Leaderboard</h2>
            <table className='leaderboard'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={index}>
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

export default Leaderboard;