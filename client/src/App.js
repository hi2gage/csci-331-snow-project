import "./App.css";
import Timepicker from "./timepicker/Time-picker";
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';


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
                </Switch>
            </Router>     
        </>
        // <div className="bg-gray-200 bg-h-min text-center min-h-screen">
        //     <div className="flex h-screen ">
        //         <div className="m-auto text-grey-1000 font-">
        //             <h3>{data}</h3>
        //             <div className="border-solid border-red-500 x-10 p-6">
        //                 <Timepicker />
        //             </div>
        //             <div className="border-solid border-red-500 x-10 p-6">
        //                 <Timepicker />
        //             </div>
        //             <div className="border-solid border-red-500 x-10 p-6">
        //                 <Timepicker />
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default App;
