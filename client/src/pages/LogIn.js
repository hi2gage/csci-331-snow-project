import React, { useState } from 'react';
import '../App.css';
import LoginForm from '../components/Form/LoginForm';

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

export default function LogIn() {
    const token = getToken();


    const adminUser = {
        email: "kerr@gmail.com",
        password: "kerr123"
    }

    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState("");

    // const Login = details => {
    //     console.log(details);
    //     if (details.email == adminUser.email && details.password == adminUser.password) {
    //         console.log("Logged IN");
    //         setUser({
    //             name: details.name,
    //             email: details.email
    //         });
    //     } else {
    //         console.log("Details do not match");
    //         setError("Details do not match!");
    //     }
    // }

    const Logout = () => {
        console.log("Logout");
        sessionStorage.clear()
        window.location.reload(false);
    }

    return (
        <div className='login'>
            {(token) ? (
                <div className="welcome">
                    <h2>Welcome to the website!</h2>
                </div>
            ) : (
                <LoginForm setToken={setToken} error={error} />
            )}
        </div>
    );
}