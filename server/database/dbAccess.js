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
        console.log("Hit the API");
        const client = new Client(credentials);
        await client.connect();
        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");
        // for (let row of now.rows) {
        //     console.log(JSON.stringify(row));
        // }
        await client.end();

        return now;


    } else {
        console.log("We are on Heroku");
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        client.connect();
        client.query('SELECT * FROM times ORDER BY id ASC;', (err, dbRes) => {
            if (err) throw err;
            for (let row of dbRes.rows) {
                console.log(JSON.stringify(row));
            }
            client.end();
            return (dbRes)
        });

    }
}

async function setAll(times) {
    console.log("Setting Up the database.");

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


async function setupDb() {
    console.log("Setting Up the database.");

    const client = new Client(credentials);
    await client.connect();

    await client.query('DROP TABLE IF EXISTS "times";');
    await client.query('CREATE TABLE times (id serial PRIMARY KEY, snow VARCHAR(25), hr INT, min INT);');

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


    client.query("INSERT INTO times (snow, hr, min) VALUES('0-3', 7, 30), ('4-7', 7, 00), ('8-11', 6, 30), ('11+', 6, 00);");
    const now = await client.query("SELECT * FROM times ORDER BY id ASC;");





    client.end()
    return now;


}

module.exports = { getAll, setupDb, setAll };
