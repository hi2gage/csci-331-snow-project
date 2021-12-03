import '../../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

// Converts the number into a string
function toStringNum(time) {
    var hour, minute = '0';
    if (time.hr < 10) {
        hour = '0' + time.hr.toString()
    } else {
        hour = time.hr.toString()
    }
    if (time.min < 10) {
        minute = '0' + time.min.toString()
    } else {
        minute = time.min.toString()
    }
    return {snow: time.snow, hour: hour, minute: minute};
}

// converts all amounts to strings
function toStringArray(data) {
    var object = []
    for (let i in data) {
        object.push(toStringNum(data[i]))
    }
    return object
}

// converts the string back to number
function toIntNum(time) {
    var hour = parseInt(time.hour)
    var minute = parseInt(time.minute)
    return { hour: hour, minute: minute };
}

// converts all strings to numbers
function toIntArray(data) {
    var object = []
    for (let i in data) {
        let time = toIntNum(data[i])
        for (let j in time) {
            object.push(time[j])
        }

    }
    return object
}


// Returns the content for each individual snow levels. State, UseState function passed in
function Picker({ state, setSnow, index }) {
    
    // Ensures that the webpage isn't refreshed everytime the data changes
    const handleSubmit = (e) => {
        e.preventDefault()
    };

    // Solves the indexing problem when changing state of variables
    const updateHour = (e) => {
        const hour = [...state];
        hour[index].hour = e.target.value;
        setSnow(hour);
    }

    // Solves the indexing problem when changing state of variables
    const updateMin = (e) => {
        const min = [...state];
        min[index].minute = e.target.value;
        setSnow(min);
    }

    return (
        <form className="time-picker"
            onSubmit={handleSubmit}>
            <div className="snowRange">
                <label className="snowRangeLabel">{state[index].snow}</label>
            </div>
            <FormControl variant="standard">
                <div className="snowRange" id="hourRange">
                    <Select
                        hour={state[index].hour}
                        value={state[index].hour}
                        defaultValue={state[index].hour}
                        onChange={e => updateHour(e)}
                        className="hourSelect"
                        sx={{ width: 200, height: 100 }}
                    >
                        <MenuItem value="00">00</MenuItem>
                        <MenuItem value="01">01</MenuItem>
                        <MenuItem value="02">02</MenuItem>
                        <MenuItem value="03">03</MenuItem>
                        <MenuItem value="04">04</MenuItem>
                        <MenuItem value="05">05</MenuItem>
                        <MenuItem value="06">06</MenuItem>
                        <MenuItem value="07">07</MenuItem>
                        <MenuItem value="08">08</MenuItem>
                        <MenuItem value="09">09</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                    </Select>
                </div>
            </FormControl>
            <div class="snowRange">
                <FormControl variant="standard">
                    <div className="snowRange" id="minuteRange">
                        <Select
                            minute={state[index].minute}
                            value={state[index].minute}
                            defaultValue={state[index].minute}
                            onChange={e => updateMin(e)}
                            className="minuteSelect"
                            sx={{ width: 200, height: 100 }}
                        >
                            <MenuItem value="00">00</MenuItem>
                            <MenuItem value="05">05</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                            <MenuItem value="15">15</MenuItem>
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="25">25</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                            <MenuItem value="35">35</MenuItem>
                            <MenuItem value="40">40</MenuItem>
                            <MenuItem value="45">45</MenuItem>
                            <MenuItem value="50">50</MenuItem>
                            <MenuItem value="55">55</MenuItem>
                        </Select>
                    </div>
                </FormControl>
            </div>
        </form>
    )
}



function Timepicker(props) {

    // Keeps track of state and entire array of different snow levels
    const [state, setSnow] = useState(toStringArray(props.data));

    // Will update the values in the table when a new set of data is pulled from server
    useEffect(() => setSnow(toStringArray(props.data)), [props.data]);

    // POST method to push the current state of the selectors back to the server
    const postToApi = () => {
        axios.post('https://csci-331-snow-project.herokuapp.com/apidb', toIntArray(state))
            .then(response => {
                console.log("I just send a POST")
                const info = response;
                console.log(info)
            })
            .catch(error => console.error(error));
    }

    // Returns the view of the 4 pickers
    return (
        <>
            <Picker state={state} setSnow={setSnow} index={0} />
            <Picker state={state} setSnow={setSnow} index={1} />
            <Picker state={state} setSnow={setSnow} index={2} />
            <Picker state={state} setSnow={setSnow} index={3} />


            {/* Submits data to server*/}
            <div className="submitDiv">
                <Button
                    className="submitButton"
                    variant="contained"
                    onClick={e => postToApi()}>
                    Submit to Server
                </Button>
            </div>
        </>
    );
}

export default Timepicker;
