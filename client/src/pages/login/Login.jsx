import { useContext } from 'react'
import { useRef } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../contex/AuthContex'
import './login.css'
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {

    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }
    console.log(user)
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Aura</h3>
                    <span className="loginDesc">Connet to your people on Aura</span>
                </div>
                <form className="loginRight" onSubmit={handleClick}>
                    <div className="loginBox">
                        <input type="email" className="loginInput" placeholder='Email' ref={email} required />
                        <input type="password" className="loginInput" placeholder='Password' ref={password} required />
                        <button className="loginButton" type='submit' disabled={isFetching}>{isFetching ? <CircularProgress color='secondary' /> : "Log in"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? <CircularProgress color='secondary' /> : "Register"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
