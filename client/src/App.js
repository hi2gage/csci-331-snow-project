import './App.css';
import Timepicker from './timepicker/Time-picker';
import React from "react";




function App() {
  const [data, setData] = React.useState(null);


  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <body class="bg-gray-200 bg-h-min text-center min-h-screen">

      <div class="flex h-screen ">
        <div class="m-auto text-grey-1000 font-">
          <h3>{data}</h3>
          <div class="border-solid border-red-500 x-10 p-6"><Timepicker /></div>
          <div class="border-solid border-red-500 x-10 p-6"><Timepicker /></div>
          <div class="border-solid border-red-500 x-10 p-6"><Timepicker /></div>
          
        </div>
      </div>
    </body>
    
  );
}

export default App;
