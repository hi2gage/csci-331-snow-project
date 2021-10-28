//Load express module with `require` directive
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');

var app = express()
app.use(cors());
app.disable('etag');

// Setting up app to use JSON
app.use(express.json());

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Now isnt this great. This is a real test')
})


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});




app.put("/api", (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))

  var data = req.body;

  console.log("\n------JSON-------")
  console.log(JSON.stringify(data, null, 2))
  
  console.log(data);
});

//Launch listening server on port 8080
app.listen(process.env.PORT || 5000, function () {
  console.log('app listening on port 5000 or whatever you like!')
})

