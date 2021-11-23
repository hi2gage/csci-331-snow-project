import "./App.css";

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import LogIn from './pages/LogIn';
import Api_Test_Unstyled from "./pages/Api_Test_Unstyled";
import SignUp from "./pages/SignUp";


function App() {
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
                <Navbar />
                <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/services' component={Services}/>
                <Route path='/products' component={Products}/>
                <Route path='/login'  component={LogIn}/>
                <Route path='/api'  component={Api_Test_Unstyled}/>
                    <Route path='/sign-up' component={SignUp}></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
