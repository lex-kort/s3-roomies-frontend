import React from "react";
import './Login.css';

function Login( { login } ){
    return(
        <form className="form-signin" onSubmit={login}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <input id="floatingInput" className="form-control" type="email" placeholder="name@example.com" />
                <label id="floatingInput">Email Address</label>
            </div>
            <div className="form-floating">
                <input id="floatingPassword" className="form-control" type="password" placeholder="password" />
                <label id="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    )
}

export default Login;