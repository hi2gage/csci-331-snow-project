import React from "react";
import '../../App.css';

class Timepicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {hour: '00', minute: '00', snow: '0'};
  
      this.handleChangeHour = this.handleChangeHour.bind(this);
      this.handleChangeMinute = this.handleChangeMinute.bind(this);
      this.handleChangeSnow = this.handleChangeSnow.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeHour(event) {
      this.setState({hour: event.target.value});
    }

    handleChangeMinute(event) {
        this.setState({minute: event.target.value});
      }

    handleChangeSnow(event) {
    this.setState({snow: event.target.value});
    }
  
  
    handleSubmit(event) {
      alert('You want to wake up at ' + this.state.hour + ':' + this.state.minute + ' based on ' + this.state.snow + ' inches of snow');
      event.preventDefault();
    }
  
    render() {
      return (
          <div class="">
              
              <form onSubmit={this.handleSubmit}>

              <label class="font-bold">Snow</label>
                <select hour={this.state.snow} onChange={this.handleChangeSnow} class="mr-5 ml-2">
                    <option snow="0"> 0"</option>
                    <option snow="1"> 1"</option>
                    <option snow="2"> 2"</option>
                    <option snow="3"> 3"</option>
                    <option snow="4"> 4"</option>
                    <option snow="5"> 5"</option>
                    <option snow="6"> 6"</option>
                    <option snow="7"> 7"</option>
                    <option snow="8"> 8"</option>
                    <option snow="9"> 9"</option>
                    <option snow="10">+9"</option>

                </select>
                
                <label class="font-bold">Hours</label>
                <select hour={this.state.hour} onChange={this.handleChangeHour} class="mr-5 ml-2">
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
                    {/* <option hour="13">13</option>
                    <option hour="14">14</option>
                    <option hour="15">15</option>
                    <option hour="16">16</option>
                    <option hour="17">17</option>
                    <option hour="18">18</option>
                    <option hour="19">19</option>
                    <option hour="20">20</option>
                    <option hour="21">21</option>
                    <option hour="22">22</option>
                    <option hour="23">23</option> */}

                </select>

                <label class="font-bold">Minutes</label>
                <select value={this.state.minute} onChange={this.handleChangeMinute} class="mr-5 ml-1">
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
            <input type="submit" value="Submit" class="p-1 rounded hover:bg-blue-500 hover:shadow-md bg-blue-300"/>
            </form>
            
          </div>
      );
    }
  }

  export default Timepicker;
