import React from 'react'
import { useState, useEffect } from 'react'
// import '../../App.css';
import '../index.css';
import axios from 'axios';
import Timepicker from '../components/timepicker/Time-picker-unstyled'


function toStringNum(time) {
    if (time.hour < 10) {
        var hour = '0' + time.hour.toString()
    }
    else {
        var hour = time.hour.toString()
    }
    if (time.minute < 10) {
        var minute = '0' + time.minute.toString()
    }
    else {
        var minute = time.minute.toString()
    }
    return { hour: hour, minute: minute };
}

function toIntNum(time) {
    var hour = parseInt(time.hour)
    var minute = parseInt(time.minute)
    return { hour: hour, minute: minute };
}

function stateToArray(data) {
    console.log(toIntNum(data));
}


function Api_Test() {
    const [data, setData] = useState();


    const getFromApi = () => {
        axios.get('/apidb')
            .then(response => {
                // console.log(JSON.stringify(response.data, null, " "));
                const info = response.data;
                setData(info);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => getFromApi(), []);

    function table() {
        return (
            <div className="">
                <table className="">
                    <tr>
                        <th className="">Snow</th>
                        <th className="">Hour</th>
                        <th className="">Minute</th>
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
                    <tr>
                        <td>{data[3].snow}"</td>
                        <td>{data[3].hr}</td>
                        <td>{data[3].min}</td>
                    </tr>
                </table>
            </div>
            
        )
    }

    


    return (
        <div className="">
            <div className="">



                <div className=''>{(data == null) ? 'not loaded' : <Timepicker hour={data[0].hr} 
                                                                                      minute={data[0].min} 
                                                                                      snow={data[0].snow} 
                                                                                      data={data} 
                                                                                      />}</div>
                

                {/* This Button pulls the data from server */}
                {/* TODO: Format the button try to keep the button inside the div if possible rename is nessesary*/}
                <div className="">
                    <input className=""
                        type="button"
                        value="Reset from Server"
                        className=""
                        form="time-picker"
                        onClick={e => getFromApi()} />
                </div>
            </div>
        </div>
    )
}

export default Api_Test
