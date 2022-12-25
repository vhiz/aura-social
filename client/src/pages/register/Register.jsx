import './register.css'

export default function Register() {
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
                        <input type="name" className="loginInput" placeholder='Username' />
                        <input type="password" className="loginInput" placeholder='Password' />
                        <input type="password" className="loginInput" placeholder='Password Again' />
                        <button className="loginButton">Sign up</button>
                        <button className="loginRegisterButton">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
