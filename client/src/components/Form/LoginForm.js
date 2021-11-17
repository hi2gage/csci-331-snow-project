import React, {useState} from 'react'
import {Paper} from "@mui/material";
import Link from "@mui/material/Link";

function LoginForm({Login, error}) {

    const [details, setDetails] = useState({name: "", email: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Login</h2>
                    {((error != "") ? (<div className="error">{error}</div>) : "")}
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name"
                               onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                    </div>
                    <div className="for-group">
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" id="email"
                               onChange={e => setDetails({...details, email: e.target.value})}
                               value={details.email}/>
                    </div>
                    <div className="for-group">
                        <label htmlFor="password">password: </label>
                        <input type="text" name="password" id="password"
                               onChange={e => setDetails({...details, password: e.target.value})}
                               value={details.password}/>
                    </div>
                    <input type="submit" value="LOGIN"/>
                </div>
            </form>
            <Link href="/sign-up" variant="body2">Need to create an account? Sign up.</Link>
        </div>
    )
}

export default LoginForm;
