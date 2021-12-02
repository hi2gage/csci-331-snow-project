import React, { useState } from 'react'
import { Paper } from "@mui/material";
import Link from "@mui/material/Link";
import './LoginForm.css'
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('https://csci-331-snow-project.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}



function LoginForm({ Login, error, setToken }) {

    const [details, setDetails] = useState({ name: "", email: "", password: "" });
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitHandler = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token);
        window.location.reload(false);

        Login(details);
    }




    return (
        <div>
            <form id="loginform" onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Login</h2>
                    {((error !== "") ? (<div className="error">{error}</div>) : "")}
                    <div className="form-group">
                        <label htmlFor="email">Email: *</label>
                        <input required type="text" name="email" id="email"
                            onChange={e => setEmail(e.target.value)} value={email} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password: *</label>
                        <input required type="password" name="password" id="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password} />
                    </div>
                    <input type="submit" value="LOGIN" onClick={console.log(email)} />
                    <Link id="link" href="/sign-up" variant="body2">Need to create an account? Sign up.</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;
