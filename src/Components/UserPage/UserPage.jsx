import Header from '../Header/Header';
import './UserPage.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserPage({ setLeaderboardData }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    async function fetchLeaderboard() {
        const username = localStorage.getItem('username');
        try {
            const response = await axios.get(`http://localhost:8080/leaderboard?username=${username}`);
            const data = response.data;
            console.log(data);
            setLeaderboardData(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <>
            <Header avatar={selectedImage} />
            <div className="user-page">
                <div className='user--container'>
                    <h2 className='user--header'>User Profile</h2>
                    <button className='logout--button' onClick={handleLogout}>Logout</button>
                </div>
                <div className='avatar--container'>
                    <label className='avatar--label'>
                        Upload Avatar:
                        <input type='file' accept='image/*' onChange={handleImageChange} />
                    </label>
                    {selectedImage && (
                        <img className='avatar--image' src={selectedImage} alt='Avatar' />
                    )}
                </div>
                <div className='leaderboard--container1'>
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
                            {Array.isArray(setLeaderboardData) && setLeaderboardData.filter((entry) => entry.username === localStorage.getItem('username')).map((entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.username}</td>
                                    <td>{entry.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default UserPage;