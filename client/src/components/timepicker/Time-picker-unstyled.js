import '../../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


// Converts the number into a string
function toStringNum(time) {
    if (time.hr < 10) {
        var hour = '0' + time.hr.toString()
    }
    else {
        var hour = time.hr.toString()
    }
    if (time.min < 10) {
        var minute = '0' + time.min.toString()
    }
    else {
        var minute = time.min.toString()
    }
    return { snow: time.snow, hour: hour, minute: minute };
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
// TODO: Still needs formating, if content needs to change please let me know
function Picker({ state, setSnow, index }) {
    
    // Ensures that the webpage isn't refreshed everytime the data changes
    const handleSubmit = (e) => {
        e.preventDefault()
    };

    // Solves the indexing problem when changing state of variables
    // TODO: Move this into another file for better readibility
    const updateHour = (e) => {
        const hour = [...state];
        hour[index].hour = e.target.value;
        setSnow(hour);
    }

    // Solves the indexing problem when changing state of variables
    // TODO: Move this into another file for better readibility
    const updateMin = (e) => {
        const min = [...state];
        min[index].minute = e.target.value;
        setSnow(min);
    }

    return (
        <form id="time-picker" className=""
            onSubmit={handleSubmit}>

            {/* TODO: Format Snow Range */}
            <div class="">
                <div class="">
                    <label className=" ">{"Snow: " + state[index].snow}</label>
                </div>
            </div>

            {/* TODO: Format the hour selector */}
            <div class="">
                <div class="">
                    <label className="">Hour</label>
                    <select hour={state[index].hour}
                        value={state[index].hour}
                        defaultValue={state[index].hour}
                        onChange={e => updateHour(e)}
                        className="">
                        <option hour="00">00</option>
                        <option hour="01">01</option>
                        <option hour="02">02</option>
                        <option hour="03">03</option>
                        <option hour="04">04</option>
                        <option hour="05">05</option>
                        <option hour="06">06</option>
                        <option hour="07">07</option>
                        <option hour="08">08</option>
                        <option hour="09">09</option>
                        <option hour="10">10</option>
                        <option hour="11">10</option>
                        <option hour="12">12</option>
                    </select>
                </div>
            </div>


            {/* TODO: Format the minute selector */}
            <div class="">
                <div class="">
                    <label className="">Minute</label>
                    <select minute={state[index].minute}
                        value={state[index].minute}
                        defaultValue={state[index].minute}
                        onChange={e => updateMin(e)}
                        className="">
                        <option minute="00">00</option>
                        <option minute="05">05</option>
                        <option minute="10">10</option>
                        <option minute="15">15</option>
                        <option minute="20">20</option>
                        <option minute="25">25</option>
                        <option minute="30">30</option>
                        <option minute="35">35</option>
                        <option minute="40">40</option>
                        <option minute="45">45</option>
                        <option minute="50">50</option>
                        <option minute="55">55</option>
                    </select>
                </div>
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
        axios.post('/apidb', toIntArray(state))
            .then(response => {
                console.log("I just send a POST")
                const info = response;
                console.log(info)
            })
            .catch(error => console.error(error));
    }

    // Returns the view of the 4 pickers
    return (
        <div className="">
            <Picker state={state} setSnow={setSnow} index={0} />
            <Picker state={state} setSnow={setSnow} index={1} />
            <Picker state={state} setSnow={setSnow} index={2} />
            <Picker state={state} setSnow={setSnow} index={3} />


            {/* Submits data to server*/}
            {/* TODO: Format button and rename if neccessary */}
            <div className="">
                <input className=""
                    type="submit"
                    value="Submit to Server"
                    form="time-picker"
                    onClick={e => postToApi()}

                />
                

                {/* Still figuring out if this is a neccessay button */}
                
                {/* <input className=""
                    type="button"
                    value="Reset"
                    className=""
                    form="time-picker"
                    // onClick={e => setSnow(toStringArray(props.data))} 
                    onClick={e => console.log(props.data)}
                /> */}
            </div>

        </div>

    );
}

export default Timepicker;
