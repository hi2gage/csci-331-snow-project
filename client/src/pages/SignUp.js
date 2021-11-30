import React from 'react';
import '../App.css';
import SignUpForm from "../components/Form/SignUpForm";

export default function SignUp({tok}) {
    console.log(tok)
    return (
        <div className='sign-up'>
            <SignUpForm />
        </div>
    );
}