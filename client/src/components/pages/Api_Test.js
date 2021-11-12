import React from 'react'
import { useState, useEffect } from 'react'
// import '../../App.css';
import '../../index.css';
import axios from 'axios';
import Timepicker from '../../timepicker/Time-picker'



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
            <div className="px-10 py-2 flex justify-center">
                <table className="px-10 py-2 table-auto text-center">
                    <tr>
                        <th className="w-6 px-5 py-2 ">Snow</th>
                        <th className="w-6 px-5 py-2 ">Hour</th>
                        <th className="w-6 px-5 py-2 ">Minute</th>
                    </tr>
                    <tr>
                        <td>{data[0].snow}"</td>
                        <td>{data[0].hr}</td>
                        <td>{data[0].min}</td>
                    </tr>
                    <tr>
                        <td>{data[1].snow}"</td>
                        <td>{data[1].hr}</td>
                        <td>{data[1].min}</td>
                    </tr>
                    <tr>
                        <td>{data[2].snow}"</td>
                        <td>{data[2].hr}</td>
                        <td>{data[2].min}</td>
                    </tr>
                </table>
            </div>
        )
    }

    {/* <div class="flex h-screen justify-center items-center">
    <div class="text-center bg-blue-400"> <!-- ⬅️ THIS DIV WILL BE CENTERED -->
        <h1 class="text-3xl">HEADING</h1>
        <p class="text-xl">Sub text</p>
    </div>
  </div> */}



    return (
        <div className="flex h-screen justify-center items-center px-10 py-10">
            <div className="">
                <div className='text-3xl' >{(data == null) ? 'not loaded' : table()}</div>
                
                <div className='text-xl'>{(data == null) ? 'not loaded' : <Timepicker hour={'0' + data[0].hr.toString()} minute={data[0].min.toString()} />}</div>
                
            </div>


        </div>
    )
}

export default Api_Test

