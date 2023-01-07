import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';

// Services
import RegisterService from "../services/RegisterService";

// Context
import { useAuth } from "../contexts/UserContext";

// Components
import AlertMessage from "../components/AlertMessage";


function Register() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState();
    
    const [registerInfo, setRegisterInfo] = useState({
        name : "",
        prefix : "",
        surname : "",
        email : "",
        password : "",
        phoneNumber : ""
    })

    const handleInput = e => {
        setRegisterInfo({
            ...registerInfo,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await RegisterService.register(registerInfo);
        setMessage(response.message);
        setAlertType(response.type);
        if(response.result){
            navigate('/login', { replace : true });
        }
        else{
            setRegisterInfo({
                name : "",
                prefix : "",
                surname : "",
                email : "",
                password : "",
                phoneNumber : ""
            })
        }
    }

    if(auth){
        return(
            <Navigate replace to="/my-account" />
        )
    }
    return (
        <div className="container">
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
                <AlertMessage message={message} type={alertType} />
            </form>
        </div>
    )
}

export default Register;