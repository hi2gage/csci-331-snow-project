import './App.css';
import React from "react";

function App() {
  const [data, setData] = React.useState(null);

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
          <button>button</button>

        </div>
      </div>
    </body>
    
  );
}

export default App;
