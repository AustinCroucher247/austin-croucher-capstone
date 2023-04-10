import Header from '../Header/Header';
import './UserPage.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserPage() {
    const username = localStorage.getItem('username');
    const [selectedImage, setSelectedImage] = useState(localStorage.getItem('avatar'));


    const [leaderboardData, setLeaderboardData] = useState(null);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    };

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
                // Handle the error here
            }
        }

        fetchLeaderboard();
        // eslint-disable-next-line
    }, []);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
            localStorage.setItem('avatar', e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Header avatar={selectedImage} />
            <div className="user-page">
                <div className='userImage--container'>
                    <div className='user--container'>
                        <h2 className='user--header'>User Profile</h2>
                    </div>
                    <div className='avatar--container'>
                        <label className='avatar--label'>
                            Upload Avatar:
                            <br></br>
                            <input type='file' accept='image/*' onChange={handleImageChange} />
                        </label>
                        {selectedImage && (
                            <img className='avatar--image' src={selectedImage} alt='Avatar' />
                        )}
                    </div>
                    <div className='container--container'>
                        <div className='leaderboard--container1'>

                            <h1 className='leaderboard--text'>Leaderboard</h1>
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
                                        {leaderboardData.slice(0, 7).map((entry, index) => (
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
                            <button className='logout--button' onClick={handleLogout}>Logout</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPage;