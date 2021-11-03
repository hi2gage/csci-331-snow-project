import "./App.css";
import Timepicker from "./timepicker/Time-picker";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'


function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message))
            .then(console.log(data));
    }, [data]);

    return (
        <div className="bg-gray-200 bg-h-min text-center min-h-screen">
            <div className="flex h-screen ">
                <div className="m-auto text-grey-1000 font-">
                    <h3>{data}</h3>
                    <div className="border-solid border-red-500 x-10 p-6">
                        <Timepicker />
                    </div>
                    <div className="border-solid border-red-500 x-10 p-6">
                        <Timepicker />
                    </div>
                    <div className="border-solid border-red-500 x-10 p-6">
                        <Timepicker />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
