//Load express module with `require` directive
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

var dbAcess = require("./database/dbAccess");
var auth = require("./auth/login")
var reg = require("./auth/register")

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





// Getter
app.get("/apidb", (req, res) => {

    if (process.env.LOCAL_OR_HEROKU == "local") {
        dbAcess.getAll().then((data) => {
            // console.log(JSON.stringify(data.rows, null, "  "))
            res.send(data.rows);

        });

    } else {
        console.log("We are on Heroku");
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        client.connect();

        await client.query('DROP TABLE IF EXISTS "times";');
        await client.query('CREATE TABLE times (id serial PRIMARY KEY, snow VARCHAR(25), hr INT, min INT);');

        var sql = "INSERT INTO times(snow, hr, min) VALUES('0-3', $1, $2), ('4-7', $3, $4), ('8-11', $5, $6), ('11+', $7, $8);";

        const now = client.query("SELECT * FROM times ORDER BY id ASC;");
        client.end();
        res.send(JSON.stringify(now, null, "  "));
    }
});

// Poster
app.post("/apidb", (req, res) => {
    console.log(req.body);
    if (process.env.LOCAL_OR_HEROKU == "local") {
        dbAcess.setAll(req.body).then((data) => {


            console.log(req.body);
            // res.send(data.rows);
            res.send(data.rows);
        });

    } else {
        console.log("We are on Heroku");
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        client.connect();

        client.query('DROP TABLE IF EXISTS "times";');
        client.query('CREATE TABLE times (id serial PRIMARY KEY, snow VARCHAR(25), hr INT, min INT);');

        client.query("INSERT INTO times (snow, hr, min) VALUES('0-3', 7, 30), ('4-7', 7, 00), ('8-11', 6, 30), ('11+', 6, 00);");

        client.end();
        res.send("testing");
    }
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
