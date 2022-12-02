import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';
import { useAuth } from "../components/UserContext";

// Services
import LoginService from "../services/LoginService";

function Login(){
    const navigate = useNavigate();
    const { user, setAuth } = useAuth();

    const [signinInfo, setSigninInfo] = useState({
        email : "",
        password: "",
        failureMessage : ""
    })

    const handleInput = e => {
        setSigninInfo({
            ...signinInfo,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const result = await LoginService.login(signinInfo.email, signinInfo.password);
            console.log('');
            if(result.status === 200){
                localStorage.setItem('jwt_access_token', result.data);
                setAuth(true);
                setSigninInfo({
                    email : "",
                    password: "",
                    disabled : true,
                    failureMessage : ""
                })
                navigate('/my-account');
            }
            else{
                setSigninInfo({
                    email : "",
                    password: "",
                    disabled : true,
                    failureMessage : "POGGERS"
                })
            }
        }
        catch{

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
            <div className="alert alert-danger mt-2" style={{display: signinInfo.failureMessage ? 'block' : 'none' }} role="alert">
                    {signinInfo.failureMessage}
            </div>
        </form>
    )
}

export default Login;