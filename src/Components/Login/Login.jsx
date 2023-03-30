import './Login.scss'
import Header from '../Header/Header';

function Login() {
    return (
        <>
            <Header />
            <div class="login-card">
                <h2>Login</h2>
                <form action="" method="post">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="submit" value="Login" />
                    <div class="error">Incorrect username or password</div>
                </form>
            </div>
        </>
    );
}

export default Login;