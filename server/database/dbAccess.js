// const e = require("express");
const { Pool, Client } = require("pg");

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

        await client.connect();

        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");
        await client.end();
        return now;

    }
}

async function setAll(times) {
    console.log("Setting Up the database.");

    const client = new Client(credentials);
    await client.connect();

    await client.query('DROP TABLE IF EXISTS "times";');
    await client.query('CREATE TABLE times (id serial PRIMARY KEY, snow VARCHAR(25), hr INT, min INT);');

    var data = [7, 30, 7, 00, 6, 30, 6, 00];

    var sql = "INSERT INTO times(snow, hr, min) VALUES('0-3', $1, $2), ('4-7', $3, $4), ('8-11', $5, $6), ('11+', $7, $8);";
    // var sql = 'INSERT INTO times(snow, hr, min) VALUES("0-3", 99, 30), ("4-7", 7, 00), ("8-11", 6, 30), ("11+", 6, 00);';

    console.log("From SetAll");
    client.query(sql, data, function(err, rows, fields){});
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


    client.query("INSERT INTO times(snow, hr, min) VALUES('0-3', 7, 30), ('4-7', 7, 00), ('8-11', 6, 30), ('11+', 6, 00);");
    const now = await client.query("SELECT * FROM times ORDER BY id ASC;");
    client.end()

    return now;


}

module.exports = { getAll, setupDb, setAll };
