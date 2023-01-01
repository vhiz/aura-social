import axios from 'axios'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'

export default function Register() {

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const phoneno = useRef()
    const navigate = useNavigate()
    const handleClick = async(e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("It doesent match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                phoneno: phoneno.current.value,
                password: password.current.value
            }

            try {
                await axios.post("http://localhost:3001/auth/register", user)
                navigate('/login')

            } catch (error) {
                console.log(error);
            }
        }
    }


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
                        <input type="name" className="loginInput" placeholder='Username' ref={username} required />
                        <input type="tel" className="loginInput" placeholder='Phone No' ref={phoneno} required />
                        <input type="password" className="loginInput" placeholder='Password' ref={password} minLength="5" required />
                        <input type="password" className="loginInput" placeholder='Password Again' ref={passwordAgain} required />
                        <button className="loginButton" type='submit'>Sign up</button>
                        <span className='loginForgotButton' >
                            <Link style={{ textDecoration: 'none' }} to="/login">
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}
