import "./App.css";

import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Api_Test from "./components/pages/Api_Test";


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
                <Route path='/sign-up'  component={SignUp}/>
                <Route path='/api'  component={Api_Test}/>
                </Switch>
            </Router>     
        </>
    );
}

export default App;
