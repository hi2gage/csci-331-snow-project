import React from 'react'
import { useState, useEffect } from 'react'
// import '../../App.css';
import '../index.css';
import axios from 'axios';
import Timepicker from '../components/timepicker/Time-picker-unstyled'
import "../components/timepicker/timePicker.css"
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function Api_Test() {
    const [data, setData] = useState();

    const getFromApi = () => {
        const deployURL = 'https://csci-331-snow-project.herokuapp.com/apidb'
        const localURL = '/apidb'
        axios.get(localURL)
            .then(response => {
                const info = response.data;
                setData(info);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => getFromApi(), []);

    return (
        <div className="timePickerPage">
            <div className="timePickerDiv">
                <Paper id="paper" elevation={3}>
                    <div className="timePickerComponent">{(data == null) ? 'not loaded' :
                        <>
                            <div id="tableLabels">
                                <label className="snowLabel">Snow</label>
                                <label className="hourLabel">Hour</label>
                                <label className="minuteLabel">Minute</label>
                            </div>
                            <Timepicker
                                hour={data[0].hr}
                                minute={data[0].min}
                                snow={data[0].snow}
                                data={data} />
                        </>}
                    </div>

                    {/* This Button pulls the data from server */}
                    <div className="resetDiv">
                        <Button
                            className="resetButton"
                            variant="contained"
                            onClick={e => getFromApi()}>
                            Reset from Server
                        </Button>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default Api_Test

