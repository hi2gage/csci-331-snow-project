import React from 'react'
import { useState, useEffect } from 'react'
// import '../../App.css';
import '../../index.css';



function Api_Test() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("")
            .then((res) => res.json())
            .then((data) => setData(data.message))
            .then(console.log(data));
    }, [data]);

    return (
        <div className="flex h-screen">
            <div>
                <div className='text-purple-600 border-4 border-red-300'>THIS IS the API Test</div>
                <div className='text-purple-600 border-4 border-red-900'>THIS IS the API Test</div>
                <div>{data}</div>

            </div>


        </div>
    )
}

export default Api_Test

