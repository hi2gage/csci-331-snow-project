//Load express module with `require` directive
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

var dbAcess = require("./database/dbAccess");

const { Pool, Client } = require("pg");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

var app = express();

app.use(cors(corsOptions)); // Use this after the variable declaration

app.disable("etag");

// Setting up app to use JSON
app.use(express.json());

//Define request response in root URL (/)
app.get("/", function (req, res) {
  res.send(process.env.LOCAL_OR_HEROKU);
});

app.get("/api", (req, res) => {
  res.json({ hour: "00", minute: "00", snow: 0 });
});

app.get("/apidb", (req, res) => {
  // dbAcess.getAll().then(data => {
  //   console.log(data);
  //   res.json(data);
  // });
  if (process.env.LOCAL_OR_HEROKU == "local") {
    dbAcess.getAll().then((data) => {
      res.send(JSON.stringify(data.rows, null, "  "));
    });
  }
  else {
    dbAcess.getAll.then((data) => {
      es.send(JSON.stringify(data, null, "  "));
    });
  }
});

app.put("/api", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.write("you posted:\n");
  res.end(JSON.stringify(req.body, null, 2));

  var data = req.body;

  console.log("\n------JSON-------");
  console.log(JSON.stringify(data, null, 2));

  console.log(data);
});

//Launch listening server on port 8080
app.listen(process.env.PORT || 5000, function () {
  console.log("app listening on port 5000 or whatever you like!");
});
