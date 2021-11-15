import '../../App.css';
import { useState, useEffect } from 'react';


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

function Timepicker(props) {
    const [state, setSnow] = useState(toStringNum(props));


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(state);
        // ... submit to API or something
    };



    return (
        <div>
            <h1 class="text-3xl">Your form title</h1>
            <form id="time-picker" class="flex flex-row bg-blue-500 p-2 items-stretch"
                onSubmit={handleSubmit}>


                {/* <!-- Input container --> */}
                <div class="w-full md:w-1/3 p-2 ">
                    <div class="bg-red-500 p-4 flex flex-row align-middle">
                        <label className=" ">{'Snow  0-3"'}</label>
                        {/* <p>0-3"</p> */}
                    </div>
                </div>


                {/* <!-- Input container --> */}
                <div class="w-full md:w-1/3 p-2 items-stretch">
                    <div class="bg-red-500 p-4 flex flex-row justify-center">
                        <label className="">Hours</label>
                        <select hour={state.hour}
                            value={state.hour}
                            defaultValue={state.hour}
                            onChange={e => setSnow({ ...state, hour: e.target.value })}
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


                {/* <!-- Input container --> */}
                <div class="w-full md:w-1/3 p-2">
                    <div class="bg-red-500 p-4 flex flex-row justify-center">
                        <label className="">Minutes</label>
                        <select minute={state.minute}
                            value={state.minute}
                            defaultValue={state.minute}
                            onChange={e => setSnow({ ...state, minute: e.target.value })}
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


            <div className="py-3 space-x-10 flex items-center justify-center ">
                <input className="p-1 rounded hover:bg-blue-500 hover:shadow-md bg-blue-300 space-x-5"
                    type="submit"
                    value="Submit"
                    form="time-picker"
                    onClick={e => stateToArray(state)}
                />

                <input className="border-green-900 border-2"
                    type="button"
                    value="Reset"
                    className="p-1 rounded hover:bg-red-500 hover:shadow-md bg-red-300"
                    form="time-picker"
                    onClick={e => setSnow(toStringNum(props))} />
            </div>

        </div>

    );
}

export default Timepicker;
