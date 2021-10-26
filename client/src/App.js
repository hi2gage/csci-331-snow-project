import './App.css';
import Timepicker from './timepicker/Time-picker';
import React from "react";
import { useState } from 'react';
import TimePicker from 'react-time-picker/dist/entry.nostyle'


function App() {
  const [data, setData] = React.useState(null);
  const [value, onChange] = useState('10:00');

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <body class="bg-grey-200 bg-h-min text-center min-h-screen">

      <div class="flex h-screen">
        <div class="m-auto text-grey-1000 font-">
          <h3>{data}</h3>
          {/* <button>button</button> */}
          <div class="border-solid border-red-500 x-10"><Timepicker /></div>
          
        </div>
      </div>
    </body>
    
  );
}

export default App;
