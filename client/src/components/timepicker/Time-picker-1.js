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
        for(let j in time){
            object.push(time[j])
        }
            
    }
    return object
}


function Picker({ state, setSnow, index }) {

    const handleSubmit = (e) => {
        e.preventDefault()
    };

    const updateHour = (e) => {
        const hour = [...state];
        hour[index].hour = e.target.value;
        setSnow(hour);
    }

    const updateMin = (e) => {
        const min = [...state];
        min[index].minute = e.target.value;
        setSnow(min);
    }

    return (
        <form id="time-picker" className="flex flex-row bg-blue-500 items-stretch border-2 border-solid border-black p-5 w-full"
            onSubmit={handleSubmit}>


            <div class="w-full md:w-1/3 p-2 ">
                <div class="bg-red-500 p-4 flex flex-row align-middle">
                    <label className=" ">{state[index].snow}</label>
                </div>
            </div>


            <div class="w-full md:w-1/3 p-2 items-stretch">
                <div class="bg-red-500 p-4 flex flex-row justify-center">
                    <label className="">Hours</label>
                    <select hour={state[index].hour}
                        value={state[index].hour}
                        defaultValue={state[index].hour}
                        onChange={e => updateHour(e)}
                        className="mr-5 ml-2">
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



            <div class="w-full md:w-1/3 p-2">
                <div class="bg-red-500 p-4 flex flex-row justify-center">
                    <label className="">Minutes</label>
                    <select minute={state[index].minute}
                        value={state[index].minute}
                        defaultValue={state[index].minute}
                        onChange={e => updateMin(e)}
                        className="mr-5 ml-1">
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
    const [state, setSnow] = useState(toStringArray(props.data));
    useEffect(() => setSnow(toStringArray(props.data)), [props.data]);

    // Pushing all of the data in the form back to the server
    const deployURL ='https://csci-331-snow-project.herokuapp.com/apidb'
    const localURL = '/apidb'
    const postToApi = () => {
        axios.post(localURL, toIntArray(state))
            .then(response => {
                console.log("I just send a POST")
                const info = response;
                console.log(info)
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="border-black border-2">
            <Picker state={state} setSnow={setSnow} index={0} />
            <Picker state={state} setSnow={setSnow} index={1} />
            <Picker state={state} setSnow={setSnow} index={2} />
            <Picker state={state} setSnow={setSnow} index={3} />


            <div className="py-3 space-x-10 flex items-center justify-center ">
                <input className="p-1 rounded hover:bg-blue-500 hover:shadow-md bg-blue-300 space-x-5"
                    type="submit"
                    value="Submit"
                    form="time-picker"
                    onClick={e => postToApi()}

                />

                <input className="border-green-900 border-2"
                    type="button"
                    value="Reset"
                    className="p-1 rounded hover:bg-red-500 hover:shadow-md bg-red-300"
                    form="time-picker"
                    // onClick={e => setSnow(toStringArray(props.data))} 
                    onClick={e => console.log(props.data)}
                />
            </div>

        </div>

    );
}

export default Timepicker;
// export {fourTime}
