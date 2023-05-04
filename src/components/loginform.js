import React, {useState} from 'react'

import "./loginform.css"
import { Link, Navigate } from 'react-router-dom';

const LoginForm = () =>{

    const givenUser = "guest@email.com"
    const givenPwd = "Pass123"

    const [userEmail, setUser] = useState('')
    const [userPwd, setPwd] = useState('')

    const [userAuth, setAuth] = useState(false)

    const [popupStyle, showPopup] = useState("hide")

    const popup = () => {
        setAuth(((givenUser === userEmail) && (givenPwd === userPwd)));
        userAuth===true? (showPopup("login-popup2")) : (showPopup("login-popup"))
        setTimeout(() => showPopup("hide"), 1000)
    }
    const freeStyle = {
        color: 'grey'
    };

    return(

        <div className="cover">

            <h1>Login</h1>
            <input 
                type="text"
                placeholder="email" 
                onChange={e => setUser(e.target.value)} 
            />
            <input
                type="password"
                placeholder="password"
                onChange={e => setPwd(e.target.value)}     
            />

            <div className="login-btn" onClick={popup}>
                Login
            </div>
            
            <p className="text">or login using</p>

            <div className="alt-login">
                <div className="facebook"></div>
                <div className="google"></div>
            </div>

            <div><Link style={freeStyle} to='/appointment'>Continue as free user</Link></div>
            
            { ((givenUser === userEmail) && (givenPwd === userPwd)) ? (
                <div className={popupStyle}>
                    <Link style={freeStyle} to='/appointment'><h3>LOGIN SUCCESSFUL</h3></Link>
                </div>
                ) : 
                (
                <div className={popupStyle}>
                    <h3>LOGIN FAILED</h3>
                    <p>email or password incorrect</p>
                </div>
                )}
                {userAuth===true ? <Navigate to="/appointment" />: null}
        </div>
    )
};

export default LoginForm