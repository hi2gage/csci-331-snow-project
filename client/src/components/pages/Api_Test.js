import React from 'react'
import { useState, useEffect } from 'react'
// import '../../App.css';
import '../../index.css';
import axios from 'axios';



function Api_Test() {
    const [data, setData] = useState();

    const getFromApi = () => {
        axios.get('/apidb')
            .then(response => {

                console.log(JSON.stringify(response.data, null, " "));
                const info = response.data;
                setData(info);
            })
            .catch(error => console.error(error));
    }
    useEffect(() => getFromApi(), []);

    function table() {
        return (
            <table className="px-2 py-2 border-2 border-yellow-800">
                <tr>
                    <th>Snow</th>
                    <th>Hour</th>
                    <th>Minute</th>
                </tr>
                <tr>
                    <td>{data[0].snow}</td>
                    <td>{data[0].hr}</td>
                    <td>{data[0].min}</td>
                </tr>
                <tr>
                    <td>{data[1].snow}</td>
                    <td>{data[1].hr}</td>
                    <td>{data[1].min}</td>
                </tr>
                <tr>
                    <td>{data[2].snow}</td>
                    <td>{data[2].hr}</td>
                    <td>{data[2].min}</td>
                </tr>
            </table>
        )
    }





    return (
        <div className="flex h-screen">
            <div>
                <div className='text-purple-600 border-4 border-red-300'>THIS IS the API Test</div>
                <div className='text-purple-600 border-4 border-red-900'>THIS IS the API Test</div>
                <div>{(data == null) ? 'not loaded' : table()}</div>

            </div>


        </div>
    )
}

export default Api_Test

