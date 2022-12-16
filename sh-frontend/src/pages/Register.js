import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';
import { useAuth } from "../components/UserContext";

// Services
import RegisterService from "../services/RegisterService";

function Register() {
    const navigate = useNavigate();
    const { user, setAuth } = useAuth();

    const [registerInfo, setRegisterInfo] = useState({
        name : "",
        prefix : "",
        surname : "",
        email : "",
        password : "",
        phoneNumber : "",
        failureMessage : ""
    })

    const handleInput = e => {
        setRegisterInfo({
            ...registerInfo,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form className="form-register">
            <h1 className="h3 mb-3 fw-normal">Sign up for a student account</h1>
            <div className="form-floating">
                <input id="floatingInput" 
                        className="form-control" 
                        type="email" 
                        placeholder="name@example.com"
                        name="email"
                        onChange={handleInput}
                        value={registerInfo.email} />
                <label id="floatingInput">Email Address</label>
            </div>
            <div className="form-floating">
                <input id="floatingPassword" 
                        className="form-control" 
                        type="password" 
                        placeholder="password" 
                        name="password"
                        onChange={handleInput}
                        value={registerInfo.password} />
                <label id="floatingPassword">Password</label>
            </div>
            <button disabled={!(registerInfo.email !== "" && registerInfo.password !== "")} className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign in</button>
            <div className="alert alert-danger mt-2" style={{display: registerInfo.failureMessage ? 'block' : 'none' }} role="alert">
                    {registerInfo.failureMessage}
            </div>
        </form>
    )
}

export default Register;