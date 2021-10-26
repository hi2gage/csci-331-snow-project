import React from "react";
import './../App.css';

class Timepicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {hour: '10', minute: '55'};
  
      this.handleChangeHour = this.handleChangeHour.bind(this);
      this.handleChangeMinute = this.handleChangeMinute.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeHour(event) {
      this.setState({hour: event.target.value});
    }

    handleChangeMinute(event) {
        this.setState({minute: event.target.value});
      }
  
    handleSubmit(event) {
      alert('You want to wake up at ' + this.state.hour + ':' + this.state.minute + ' based on X inches of snow');
      event.preventDefault();
    }
  
    render() {
      return (
          <div class="p-6 border-none hover:border-2 hover:border-red-800 ">
              
              <form onSubmit={this.handleSubmit}>
                <label>Hours</label>
                <select hour={this.state.hour} onChange={this.handleChangeHour} class="mr-5 ml-2">
                    <option hour="1">1</option>
                    <option hour="2">2</option>
                    <option hour="3">3</option>
                    <option hour="4">4</option>
                    <option hour="5">5</option>
                    <option hour="6">6</option>
                    <option hour="7">7</option>
                    <option hour="8">8</option>
                    <option hour="9">9</option>
                    <option hour="10">10</option>
                    <option hour="11">10</option>
                    <option hour="12">12</option>
                </select>

                <label>Minutes</label>
                <select value={this.state.minute} onChange={this.handleChangeMinute} class="mr-20 ml-2">
                    <option value-minute="00">00</option>
                    <option value-minute="05">05</option>
                    <option value-minute="10">10</option>
                    <option value-minute="15">15</option>
                    <option value-minute="20">20</option>
                    <option value-minute="25">25</option>
                    <option value-minute="30">30</option>
                    <option value-minute="35">35</option>
                    <option value-minute="40">40</option>
                    <option value-minute="45">45</option>
                    <option value-minute="50">50</option>
                    <option value-minute="55">55</option>
                </select>

            <input type="submit" value="Submit" class="p-1 rounded hover:bg-blue-500 hover:shadow-md bg-blue-300"/>
            </form>
            
          </div>
      );
    }
  }

  export default Timepicker;
