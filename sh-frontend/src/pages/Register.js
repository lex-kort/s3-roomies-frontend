import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Register.css';

// Services
import RegisterService from "../services/RegisterService";

// Context
import { useAuth } from "../contexts/UserContext";

// Components
import AlertMessage from "../components/AlertMessage";

// Enums
import AlertTypes from "../services/utils/AlertTypes";

function Register() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState();
    const [isValidated, setIsValidated] = useState(false);
    
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
        setIsValidated(true);

        // Source: https://stackoverflow.com/questions/27709636/
        if(Object.values(registerInfo).some(prop => prop === null || prop === "")) {
            setMessage("Not all fields were properly filled in");
            setAlertType(AlertTypes.Warning);
        }
        else{
            const response = await RegisterService.register(registerInfo);
            setMessage(response.message);
            setAlertType(response.type);
            if(response.result){
                navigate('/login', { replace : true });
            }
            else{
                setRegisterInfo({
                    ...registerInfo,
                    email : ""
                });
            }
        }
    }

    if(auth){
        return(
            <Navigate replace to="/my-account" />
        )
    }
    return (
        <div className="container">
            <form className={"form-register needs-validation " + (isValidated ? "was-validated" : "")}>
                <h1 className="h3 mb-3 fw-normal">Sign up for a student account</h1>
                <div className="row">
                    <div className="form-group col-5 mb-3">
                        <label className="form-label">First name:</label>
                        <input className="form-control" type="text" 
                            name="name"
                            onChange={handleInput}
                            value={registerInfo.name} 
                            pattern="^[a-zA-Z ]+" required/>
                        <div className="invalid-feedback">
                            Enter first name
                        </div>
                    </div>
                    <div className="form-group col-2 mb-3">
                        <label className="form-label">Prefix:</label>
                        <input className="form-control" type="text" 
                            name="prefix"
                            onChange={handleInput}
                            value={registerInfo.prefix}
                            pattern="^[a-zA-Z ]+"/>
                        <div className="invalid-feedback">
                            Invalid prefix
                        </div>
                    </div>
                    <div className="form-group col-5 mb-3">
                        <label className="form-label">Last name:</label>
                        <input className="form-control" type="text" 
                            name="surname"
                            onChange={handleInput}
                            value={registerInfo.surname} 
                            pattern="^[a-zA-Z ]+" required/>
                        <div className="invalid-feedback">
                            Enter last name
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Student number:</label>
                    <input className="form-control" type="text"
                            name="studentNumber"
                            onChange={handleInput}
                            value={registerInfo.studentNumber} required/>
                    <div className="invalid-feedback">
                        Enter student number
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Phone number:</label>
                    <input className="form-control" type="text"
                            name="phoneNumber"
                            onChange={handleInput}
                            value={registerInfo.phoneNumber} required/>
                    <div className="invalid-feedback">
                        Enter phone number
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Email address:</label>
                    <input className="form-control" type="email" 
                            name="email"
                            onChange={handleInput}
                            value={registerInfo.email} required/>
                    <div className="invalid-feedback">
                        Enter email
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Password:</label>
                    <input className="form-control" type="password" 
                            name="password"
                            onChange={handleInput}
                            value={registerInfo.password} required/>
                    <div className="invalid-feedback">
                        Enter password
                    </div>
                </div>
                <button className="w-100 btn btn-lg btn-primary  mb-3" type="submit" onClick={handleSubmit}>Register account</button>
                <AlertMessage message={message} type={alertType} />
            </form>
        </div>
    )
}

export default Register;