import "./App.css";

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Api_Test_Unstyled from "./pages/Api_Test_Unstyled";
import SignUp from "./pages/SignUp";


function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function App() {
    const token = getToken();
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/apidb")
            .then((res) => res.json())
            .then((data) => setData(data.message))
            .then(console.log(data));
    }, [data]);

    return (
        <>
            <Router>
                <Navbar userStatus={(token)} />
                <Switch>
                    <Route path='/' exact component={Home} />
                    {/* <Route
                        path='/'
                        render={() => (
                            <Home loggedinStatus={false} />
                        )
                    } /> */}
                    <Route path='/login' component={LogIn} />
                    
                    {/* Allowing access to api Page */}
                    {token ?
                        (<Route path='/api' component={Api_Test_Unstyled} />) : (null)}
                    <Route
                        path='/sign-up'
                        render={() => (
                            <SignUp tok={"true"} />
                        )
                    } />
                </Switch>
            </Router>
        </>
    );
}

export default App;
