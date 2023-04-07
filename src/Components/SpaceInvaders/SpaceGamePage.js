import GameComponent from '../SpaceInvaders/GameMountComp.js';
import { useState, useEffect } from 'react';
import './SpaceGamePage.scss';
import Header from '../Header/Header.jsx';
import { useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';


const SERVER_ADDRESS = 'http://localhost:8080'

function SpaceGamePage(props) {
    const [renderGame, setRenderGame] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [score, setScore] = useState(0)
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [showChat, setShowChat] = useState(false);

    const username = localStorage.getItem('username');

    const scoreRef = useRef(0);
    const socketRef = useRef(null);
    const handleMessageInputChange = (event) => {
        setMessage(event.target.value);
    };
    // eslint-disable-next-line
    useEffect(() => {
        socketRef.current = io(`${SERVER_ADDRESS}`, {
            transports: ['websocket', 'polling'],
        });


        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket server:', socketRef.current.id);
            socketRef.current.emit('joinRoom', roomId);
        });

        socketRef.current.emit('requestChatHistory', roomId);

        socketRef.current.on('chatHistory', (history) => {
            setMessages(history);
        });

        socketRef.current.on('chatMessage', (message) => {
            setMessages((messages) => [...messages, message]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
        // eslint-disable-next-line
    }, [roomId]);
    const handleMessageFormSubmit = (event) => {
        event.preventDefault();
        if (message.trim() === '') {
            return;
        }
        const newMessage = {
            roomId,
            text: message.trim(),
            senderId: socketRef.current.id,
            senderName: username


        };
        socketRef.current.emit('message', newMessage);
        setMessages((messages) => [...messages, newMessage]);
        setMessage('');
    };

    const handleScore = (score, game) => {
        scoreRef.current += score;
        setScore(scoreRef.current);
    };

    const startGame = () => {
        setShowModal(false);
        setRenderGame(true);
        setShowChat(true);
        socketRef.current.emit('createRoom', (createdRoomId) => {
            socketRef.current.emit('joinRoom', createdRoomId);
        });

    };

    const [rooms, setRooms] = useState({});
    // eslint-disable-next-line
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('updateRooms', (updatedRooms) => {
                setRooms(updatedRooms);
                console.log(rooms)
            });

            return () => {
                socketRef.current.off('updateRooms');
            };
        }
        // eslint-disable-next-line
    }, [socketRef.current]);

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

    //     // Add this line to receive the room updates from the server
    //     socketRef.current.on('updateRooms', (updatedRooms) => {
    //         setRooms(updatedRooms);
    //     });


    //     return () => {
    //         if (socketRef.current) {
    //             socketRef.current.off('updateRooms');
    //         }
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
            </div>
            <p className='score'>{showModal ? "" : 'Score: ' + score}</p>
            <div className='game--container'>
                {renderGame && (
                    <>
                        <GameComponent player={true} socketRef={socketRef} handleScore={handleScore} postScore={postScore} setShowGameOverModal={setShowGameOverModal} />

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

                {showChat && (
                    <div className="parent-container">
                        <h2>Chat Room: {roomId}</h2>
                        <div>
                            {messages.map((message, index) => (
                                <div key={index}>
                                    <p>{message.text}</p>
                                    <small>from: {message.senderName}</small>
                                </div>
                            ))}
                        </div>
                        <form className='chat--form' onSubmit={handleMessageFormSubmit}>
                            <label htmlFor="message">Message:</label>
                            <input
                                className='input--chat'
                                type="text"
                                id="message"
                                name="message"
                                value={message}
                                onChange={handleMessageInputChange}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                )}
                {/* <Link to={'/ActiveStreams/SpaceInvaders'}> <button>Active Streams</button> </Link> */}




            </div>
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
    );
}

export default SpaceGamePage;



//onyl the person who made the room can close it
// {socketRef.current && socketRef.current.id === room.creator && (
//     <button onClick={() => handleCloseRoom(roomId)}>Close Room</button>
// )}