import './Login.scss';
import Header from '../Header/Header';
import { useState } from 'react';
import axios from 'axios'; // Don't forget to import axios

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (isRegistering) {
                // Send a POST request to the register route with the user's credentials
                const response = await axios.post('http://localhost:8080/register', { username, password });

                if (response.status === 200) {
                    // Switch to the login form after registration
                    setIsRegistering(false);
                    setUsername('');
                    setPassword('');
                    setError('');
                } else {
                    // Display an error message if the registration was unsuccessful
                    setError(response.data.error);
                }
            } else {
                // Send a POST request to the login route with the user's credentials
                const response = await axios.post('http://localhost:8080/login', { username, password });

                if (response.status === 200) {
                    // Get the JWT token from the response and store it in local storage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', response.data.username); // Save the username to localStorage

                    // Redirect to the home page or the protected route
                    window.location.href = '/HomePage';
                } else {
                    // Display an error message if the login was unsuccessful
                    setError(response.data.error);
                }
            }
        } catch (error) {
            console.error(error);
            setError('Internal server error');
        }
    };

    return (
        <>
            <Header />
            <div className="login-card">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <input type="submit" value={isRegistering ? 'Register' : 'Login'} />
                    {error && <div className="error">{error}</div>}
                    {!isRegistering && (
                        <div>
                            Don't have an account?{' '}
                            <button type="button" onClick={() => setIsRegistering(true)}>
                                Register now
                            </button>
                        </div>
                    )}
                    {isRegistering && (
                        <div>
                            Already have an account?{' '}
                            <button type="button" onClick={() => setIsRegistering(false)}>
                                Login instead
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default Login;