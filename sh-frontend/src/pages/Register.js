import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Register.css';

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
        phoneNumber : "",
        studentNumber : ""
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
                <div className="row">
                    <div className="form-group col-5 mb-3">
                        <label className="form-label">First name:</label>
                        <input className="form-control" type="text" 
                            name="name"
                            onChange={handleInput}
                            value={registerInfo.name} />
                    </div>
                    <div className="form-group col-2 mb-3">
                        <label className="form-label">Prefix:</label>
                        <input className="form-control" type="text" 
                            name="prefix"
                            onChange={handleInput}
                            value={registerInfo.prefix}/>
                    </div>
                    <div className="form-group col-5 mb-3">
                        <label className="form-label">Last name:</label>
                        <input className="form-control" type="text" 
                            name="surname"
                            onChange={handleInput}
                            value={registerInfo.surname} />
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Student number:</label>
                    <input className="form-control" type="text"
                            name="studentNumber"
                            onChange={handleInput}
                            value={registerInfo.studentNumber} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Phone number:</label>
                    <input className="form-control" type="text"
                            name="phoneNumber"
                            onChange={handleInput}
                            value={registerInfo.phoneNumber} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Email address:</label>
                    <input className="form-control" type="email" 
                            name="email"
                            onChange={handleInput}
                            value={registerInfo.email} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Password:</label>
                    <input className="form-control" type="password" 
                            name="password"
                            onChange={handleInput}
                            value={registerInfo.password} />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Register account</button>
                <AlertMessage message={message} type={alertType} />
            </form>
        </div>
    )
}

export default Register;