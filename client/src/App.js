import "./App.css";

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
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
                    <Route path='/services' component={Services} />
                    <Route path='/products' component={Products} />
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
