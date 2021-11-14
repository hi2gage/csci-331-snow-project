import React, {useState} from 'react';
import '../App.css';
import LoginForm from '../components/Form/LoginForm';

export default function SignUp() {
  const adminUser = {
    email: "kerr@gmail.com",
    password: "kerr123"
  }

  const [user, setUser] = useState({name:"",email:""});
  const[error, setError] = useState("");

  const Login = details => {
    console.log(details);
    if(details.email == adminUser.email && details.password == adminUser.password){
      console.log("Logged IN");
        setUser({
          name: details.name,
          email: details.email
        });
    }
    else{
      console.log("Details do not match");
      setError("Details do not match!");
    }
  }

  const Logout = () => {
    console.log("Logout");
    setUser({name:"",email:""});
  }

  return (
  <div className='sign-up'>
    {(user.email != "") ? (
      <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
      </div>
    ) : (
      <LoginForm Login={Login} error={error} />
    )}
  </div>
  );
}