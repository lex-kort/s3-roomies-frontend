import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

// Services
import ListingService from "../services/LoginService";

function Login(){
    const navigate = useNavigate();

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

    const handleLogin = e => {
        e.preventDefault();
        (async () => {
            const result = await ListingService.login(signinInfo.email, signinInfo.password);
            if(result.status === 200){
                localStorage.setItem('jwt_access_token', result.data);
                window.dispatchEvent(new Event("storage"));
                navigate('/my-account');
                setSigninInfo({
                    email : "",
                    password: "",
                    disabled : true,
                    failureMessage : ""
                })
            }
            else{
                setSigninInfo({
                    email : "",
                    password: "",
                    disabled : true,
                    failureMessage : "POGGERS"
                })
            }
        })();
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
            <button disabled={!(signinInfo.email !== "" && signinInfo.password !== "")} className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleLogin}>Sign in</button>
            <div className="alert alert-danger mt-2" style={{display: signinInfo.failureMessage ? 'block' : 'none' }} role="alert">
                    {signinInfo.failureMessage}
            </div>
        </form>
    )
}

export default Login;