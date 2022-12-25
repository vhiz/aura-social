import './login.css'

export default function Login() {
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Aura</h3>
                    <span className="loginDesc">Connet to your people on Aura</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="email" className="loginInput" placeholder='Email' />
                        <input type="password" className="loginInput" placeholder='Password' />
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
