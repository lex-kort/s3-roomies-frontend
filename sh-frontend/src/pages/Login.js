import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';

// Services
import AuthService from "../services/AuthService";

// Context
import { useAuth } from "../contexts/UserContext";

// Components
import AlertMessage from "../components/AlertMessage";

function Login(){
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState();

    const [signinInfo, setSigninInfo] = useState({
        email : "",
        password: ""
    })

    const handleInput = e => {
        setSigninInfo({
            ...signinInfo,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await AuthService.login(signinInfo.email, signinInfo.password);
        setMessage(response.message);
        setAlertType(response.type);
        if(response.result){
            setAuth(true);
            navigate('/my-account', { replace : true });
        }
        else{
            setSigninInfo({
                email : "",
                password: "",
                disabled : true
            })
        }
    }

    if(auth){
        return(
            <Navigate replace to="/my-account" />
        )
    }
    return(
        <div className="container">
            <form className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input id="floatingInput" 
                            className="form-control" 
                            type="email" 
                            placeholder="name@example.com"
                            name="email"
                            onChange={handleInput}
                            value={signinInfo.email} />
                    <label id="floatingInput">Email Address</label>
                </div>
                <div className="form-floating">
                    <input id="floatingPassword" 
                            className="form-control" 
                            type="password" 
                            placeholder="password" 
                            name="password"
                            onChange={handleInput}
                            value={signinInfo.password} />
                    <label id="floatingPassword">Password</label>
                </div>
                <button disabled={!(signinInfo.email !== "" && signinInfo.password !== "")} className="w-100 btn btn-lg btn-primary mb-3" type="submit" onClick={handleSubmit}>Sign in</button>
                <AlertMessage message={message} type={alertType} />
            </form>
        </div>
    )
}

export default Login;