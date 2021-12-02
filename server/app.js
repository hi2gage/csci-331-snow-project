//Load express module with `require` directive
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

var dbAcess = require("./database/dbAccess");
var auth = require("./auth/login")
var reg = require("./auth/register")
var scrapper = require('./scrapper/scrapper')

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
    res.send(process.env.DATABASE_URL);
});


app.get("/api", (req, res) => {
    res.json({ hour: "00", minute: "00", snow: 0 });
});





// Gets all of the times from the database
app.get("/apidb", (req, res) => {
    dbAcess.getAll().then((data) => {
        res.send(data.rows);

    });
});

// Poster
app.post("/apidb", (req, res) => {
    dbAcess.setAll(req.body).then((data) => {
        console.log(req.body);
        res.send(data.rows);
    });
});



app.get("/env", (req, res) => {
    res.send(JSON.stringify(process.env, null, " <br> "));
});

app.get("/setup", (req, res) => {
    dbAcess.setupDb().then((data) => {
        res.send(JSON.stringify(data.rows, null, "  "));
    });
});

app.use('/login', (req, res) => {
    console.log(req.body)
    console.log("-------------")

    let checker = auth.checkAuth(req.body)
    checker.then(result => {
        if (result) {
            console.log("correct password and username")
            res.send({
                token: 'test123'
            });
        }
        else {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
            });
        }
    })
});

app.use('/register', (req, res) => {
    console.log(req.body)

    let register = reg.register(req.body)

    if (req.body.email === 'gage' && req.body.password === 'pass') {
        console.log("correct password and username")
        res.send({
            result: "Success"
        });
    }
    else {
        res.send({
            error: "Failure"
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

app.get("/scrap", (req, res) => {
    const sc = scrapper
    sc.scrap().then((returnedValue) => {
        res.send(returnedValue)
    })
    
});
