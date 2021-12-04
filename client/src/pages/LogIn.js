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

    const [error, setError] = useState("");

    const Logout = () => {
        console.log("Logout");
        sessionStorage.clear()
        window.location.reload(false);
    }

    return (
        <div className='sign-in'>
            <LoginForm setToken={setToken} error={error} />
        </div>
    );
}