import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';

// Services
import AuthService from "../services/AuthService";

// Context
import { useAuth } from "../contexts/UserContext";

function Login(){
    const navigate = useNavigate();
    const { user, setAuth } = useAuth();

    const [signinInfo, setSigninInfo] = useState({
        email : "",
        password: ""
    })
    const [message, setMessage] = useState("");

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
        if(response.result){
            setAuth(true);
            navigate('/my-account');
        }
        else{
            setSigninInfo({
                email : "",
                password: "",
                disabled : true
            })
        }
    }

    if(user){
        return(
            <Navigate replace to="/my-account" />
        )
    }
    return(
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
            <button disabled={!(signinInfo.email !== "" && signinInfo.password !== "")} className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign in</button>
            {message && (
                <div className="alert alert-danger mt-2" role="alert">
                    {message}
                </div>
            )}
        </form>
    )
}

export default Login;