import GameComponent from '../SpaceInvaders/GameMountComp.js';
import { useState, useEffect } from 'react';
import './SpaceGamePage.scss';
import Header from '../Header/Header.jsx';
import { useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import ActiveRooms from '../ActiveStreams/ActiveRooms';


const SERVER_ADDRESS = 'http://localhost:8080'

function SpaceGamePage() {
    const [renderGame, setRenderGame] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [score, setScore] = useState(0)
    const [showGameOverModal, setShowGameOverModal] = useState(false);

    const scoreRef = useRef(0);
    const socketRef = useRef(null);

    const handleCloseRoom = (roomId) => {
        socketRef.current.emit('closeRoom', roomId);
    };

    const handleScore = (score, game) => {
        scoreRef.current += score;
        setScore(scoreRef.current);
    };

    const startGame = () => {
        setShowModal(false);
        setRenderGame(true);
        socketRef.current.emit('createRoom');

    };


    const handleCreateRoom = () => {
        socketRef.current.emit('createRoom');
    };

    const handleJoinRoom = (roomId) => {
        socketRef.current.emit('joinRoom', roomId);
    };

    const handleLeaveRoom = (roomId) => {
        socketRef.current.emit('leaveRoom', roomId);
    };

    const [rooms, setRooms] = useState({});

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('updateRooms', (updatedRooms) => {
                setRooms(updatedRooms);
            });

            return () => {
                socketRef.current.off('updateRooms');
            };
        }
    }, [socketRef.current]);

    useEffect(() => {
        socketRef.current = io(`${SERVER_ADDRESS}`, {
            transports: ['websocket', 'polling'],
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket server:', socketRef.current.id);
        });

        socketRef.current.on('RECEIVE', (data) => {
            console.log(data)
        });

        socketRef.current.on('gameEvent', (event) => {
            // Update the game state based on the received event
        });

        // Add this line to receive the room updates from the server
        socketRef.current.on('updateRooms', (updatedRooms) => {
            setRooms(updatedRooms);
        });

        socketRef.current.emit('EXAMPLE', "Send this string to this server", "Also send this!");

        return () => {
            if (socketRef.current) {
                socketRef.current.off('updateRooms');
            }
            socketRef.current.disconnect();
        };
    }, []);






    // useEffect(() => {
    //     socketRef.current = io(`${SERVER_ADDRESS}`, {
    //         transports: ['websocket', 'polling'],
    //     });

    //     socketRef.current.on('connect', () => {
    //         console.log('Connected to WebSocket server:', socketRef.current.id);
    //     });

    //     socketRef.current.on('RECEIVE', (data) => {
    //         console.log(data)
    //     });

    //     socketRef.current.on('gameEvent', (event) => {
    //         // Update the game state based on the received event
    //     });


    //     socketRef.current.emit('EXAMPLE', "Send this string to this server", "Also send this!");

    //     return () => {
    //         socketRef.current.disconnect();
    //     };
    // }, []);

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
    function preventScrollOnSpacebar(e) {
        if (e.keyCode === 32) {
            e.preventDefault();
        }
    }

    document.addEventListener('keydown', preventScrollOnSpacebar, false);
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

                        {
                            showGameOverModal && (
                                <div className="game-over-modal">
                                    <div className="modal-content1">
                                        <h2>Game Over</h2>
                                        <p>Your score was posted to the leaderboard below if you were in the top 7!</p>
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
            <Link to={'/ActiveStreams/SpaceInvaders'}> <button>Active Streams</button> </Link>
            {/* <ActiveRooms rooms={rooms} handleJoinRoom={handleJoinRoom} handleCloseRoom={handleCloseRoom} /> */}

            {/* <div>
                <h2>Active Rooms</h2>
                <ul>
                    {Object.entries(rooms).map(([roomId, room]) => (
                        <li key={roomId}>
                            Room ID: {roomId} - Players: {room.players.length}
                            <button onClick={() => handleJoinRoom(roomId)}>Join</button>
                            <button onClick={() => handleCloseRoom(roomId)}>Close Room</button>


                        </li>
                    ))}
                </ul>
                <button onClick={handleCreateRoom}>Create Room</button>
            </div> */}
            <div className="parent-container">

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
                            {leaderboardData.slice(0, 7).map((entry, index) => (
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
        </div>
    );
}

export default SpaceGamePage;



//onyl the person who made the room can close it
// {socketRef.current && socketRef.current.id === room.creator && (
//     <button onClick={() => handleCloseRoom(roomId)}>Close Room</button>
// )}