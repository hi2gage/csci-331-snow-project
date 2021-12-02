// const e = require("express");
const { Pool, Client } = require("pg");
const bcrypt = require("bcrypt");


const credentials = {
    user: "postgres",
    host: "db",
    database: "mainDB",
    password: "pass",
    port: 5432,
};

async function getAll() {
    if (process.env.LOCAL_OR_HEROKU == "local") {
        console.log("Hit the API Locally");
        const client = new Client(credentials);
        await client.connect();
        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");
        for (let row of now.rows) {
            console.log(JSON.stringify(row));
        }
        await client.end();

        return now;
    }
    else {
        console.log("Hit the API on Heroku");
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        await client.connect();

        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");
        // for (let row of now.rows) {
        //     console.log(JSON.stringify(row));
        // }
        await client.end();

        return now;
    }
}

async function setAll(times) {
    if (process.env.LOCAL_OR_HEROKU == "local") {
        console.log("setting time values locally")

        const client = new Client(credentials);
        await client.connect();

        await client.query('DROP TABLE IF EXISTS "times";');
        await client.query('CREATE TABLE times (id serial PRIMARY KEY, snow VARCHAR(25), hr INT, min INT);');

        var sql = "INSERT INTO times(snow, hr, min) VALUES('0-3', $1, $2), ('4-7', $3, $4), ('8-11', $5, $6), ('11+', $7, $8);";
        // var sql = 'INSERT INTO times(snow, hr, min) VALUES("0-3", 99, 30), ("4-7", 7, 00), ("8-11", 6, 30), ("11+", 6, 00);';

        console.log("From SetAll");
        client.query(sql, times, function (err, rows, fields) { });
        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");
        client.end()


        return now;
    }
    else {
        console.log("setting time values on Heroku")
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        await client.connect();

        await client.query('DROP TABLE IF EXISTS "times";');
        await client.query('CREATE TABLE times (id serial PRIMARY KEY, snow VARCHAR(25), hr INT, min INT);');

        var sql = "INSERT INTO times(snow, hr, min) VALUES('0-3', $1, $2), ('4-7', $3, $4), ('8-11', $5, $6), ('11+', $7, $8);";
        // var sql = 'INSERT INTO times(snow, hr, min) VALUES("0-3", 99, 30), ("4-7", 7, 00), ("8-11", 6, 30), ("11+", 6, 00);';

        console.log("From SetAll");
        client.query(sql, times, function (err, rows, fields) { });
        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");
        client.end()


        return now;
    }

}


async function setupDb() {

    if (process.env.LOCAL_OR_HEROKU == "local") {
        console.log("Setting Up the database locally");

        const client = new Client(credentials);
        await client.connect();

        // Adding times table and adding data
        await client.query('DROP TABLE IF EXISTS "times";');
        await client.query('CREATE TABLE times (id serial PRIMARY KEY, snow VARCHAR(25), hr INT, min INT);');
        client.query("INSERT INTO times (snow, hr, min) VALUES('0-3', 7, 30), ('4-7', 7, 00), ('8-11', 6, 30), ('11+', 6, 00);");


        // Creating users table and adding new user
        await client.query('DROP TABLE IF EXISTS "users";');
        await client.query('CREATE TABLE users (id serial PRIMARY KEY, ' +
            'first VARCHAR(25), ' +
            'last VARCHAR(25), ' +
            'email VARCHAR(50), ' +
            'password VARCHAR(200));');

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash("pass", salt);

        let sql = "INSERT INTO users (first, last, email, password) VALUES ('gage', 'halverson', 'gage@halverson.com', $1);"
        client.query(sql, [pass]);


        await client.query('DROP TABLE IF EXISTS "snowfall_wf";');
        await client.query('CREATE TABLE snowfall_wf (id serial PRIMARY KEY, ' +
            'date_time VARCHAR(50),' +
            'Overnight_Snow_in INT, ' +
            'Settled_Base_in INT, ' +
            'Total_to_Date_in INT, ' +
            'six_am_Temp_F INT, ' +
            'twentyfour_hr_Snow_in INT, ' +
            'seven_Day_Snow_in INT, ' +
            'Current_Conditions VARCHAR(25),' +
            'Visibility_Wind VARCHAR(25));'
        );
        client.query("INSERT INTO snowfall_WF (date_time, " +
            "Overnight_Snow_in, " +
            "Settled_Base_in, " +
            "Total_to_Date_in, " +
            "six_am_Temp_F, " +
            "twentyfour_hr_Snow_in, " +
            "seven_Day_Snow_in, " +
            "Current_Conditions, " +
            "Visibility_Wind)" +

            "VALUES('12/2/2021, 9:37:59 PM', 1,  20, 26, 27, 1, 10, 'Cloud', 'Low/SW at 19mph');");


        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");

        client.end()
        return now;
    }
    else {
        console.log("Setting Up the database on Heroku");

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });


        await client.connect();

        // Adding times table and adding data
        await client.query('DROP TABLE IF EXISTS "times";');
        await client.query('CREATE TABLE times (id serial PRIMARY KEY, snow VARCHAR(25), hr INT, min INT);');
        client.query("INSERT INTO times (snow, hr, min) VALUES('0-3', 7, 30), ('4-7', 7, 00), ('8-11', 6, 30), ('11+', 6, 00);");


        // Creating users table and adding new user
        await client.query('DROP TABLE IF EXISTS "users";');
        await client.query('CREATE TABLE users (id serial PRIMARY KEY, ' +
            'first VARCHAR(25), ' +
            'last VARCHAR(25), ' +
            'email VARCHAR(50), ' +
            'password VARCHAR(200));');

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash("pass", salt);

        let sql = "INSERT INTO users (first, last, email, password) VALUES ('gage', 'halverson', 'gage@halverson.com', $1);"
        client.query(sql, [pass]);


        await client.query('DROP TABLE IF EXISTS "snowfall_wf";');
        await client.query('CREATE TABLE snowfall_wf (id serial PRIMARY KEY, ' +
            'date_time VARCHAR(50),' +
            'Overnight_Snow_in INT, ' +
            'Settled_Base_in INT, ' +
            'Total_to_Date_in INT, ' +
            'six_am_Temp_F INT, ' +
            'twentyfour_hr_Snow_in INT, ' +
            'seven_Day_Snow_in INT, ' +
            'Current_Conditions VARCHAR(25),' +
            'Visibility_Wind VARCHAR(25));'
        );
        client.query("INSERT INTO snowfall_WF (date_time, " +
            "Overnight_Snow_in, " +
            "Settled_Base_in, " +
            "Total_to_Date_in, " +
            "six_am_Temp_F, " +
            "twentyfour_hr_Snow_in, " +
            "seven_Day_Snow_in, " +
            "Current_Conditions, " +
            "Visibility_Wind)" +

            "VALUES('12/2/2021, 9:37:59 PM', 1,  20, 26, 27, 1, 10, 'Cloud', 'Low/SW at 19mph');");


        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");

        client.end()
        return now;
    }


}


async function setScrapData(data) {

    let input = Object.values(data)
    if (process.env.LOCAL_OR_HEROKU == "local") {
        console.log("Adding scrapped Data Locally");

        const client = new Client(credentials);
        await client.connect();

        let sql = `INSERT INTO snowfall_wf (date_time, overnight_Snow_in, Settled_Base_in, ` +
            `Total_to_Date_in, six_am_Temp_F, twentyfour_hr_Snow_in, seven_Day_Snow_in, Current_Conditions, Visibility_Wind) ` +
            `VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`


        client.query(sql, input, function (err, rows, fields) { });
        const now = await client.query("SELECT * FROM snowfall_WF ORDER BY id DESC LIMIT 1;");
        client.end()

        return now
    }
    else {
        console.log("Adding scrapped Data on Heroku");
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        await client.connect();

        let sql = `INSERT INTO snowfall_wf (date_time, overnight_Snow_in, Settled_Base_in, ` +
            `Total_to_Date_in, six_am_Temp_F, twentyfour_hr_Snow_in, seven_Day_Snow_in, Current_Conditions, Visibility_Wind) ` +
            `VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`


        client.query(sql, input, function (err, rows, fields) { });
        const now = await client.query("SELECT * FROM snowfall_WF ORDER BY id DESC LIMIT 1;");
        client.end()
        return now

    }

}

async function getScrapData() {
    if (process.env.LOCAL_OR_HEROKU == "local") {
        console.log("Getting scrapped Data Locally");

        const client = new Client(credentials);
        await client.connect();

        const now = await client.query("SELECT * FROM snowfall_WF ORDER BY id DESC LIMIT 1;");
        client.end()

        return now
    }
    else {
        console.log("Getting scrapped Data on Heroku");
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        await client.connect();

        const now = await client.query("SELECT * FROM snowfall_WF ORDER BY id DESC LIMIT 1;");
        client.end()
        return now
    }


}

module.exports = { getAll, setupDb, setAll, setScrapData, getScrapData };
