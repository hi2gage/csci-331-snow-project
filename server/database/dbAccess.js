const e = require("express");
const { Pool, Client } = require("pg");

const credentials = {
    user: "postgres",
    host: "db",
    database: "mainDB",
    password: "pass",
    port: 5432,
};

async function getAll(personId) {
    console.log(process.env.LOCAL_OR_HEROKU);
    if (process.env.LOCAL_OR_HEROKU == "local") {
        // console.log("We are on local");
        // const pool = new Pool(credentials);
        // const text = `SELECT * FROM times ORDER BY id ASC`;
        // return pool.query(text);
        const client = new Client(credentials);
        await client.connect();
        const now = await client.query("SELECT * FROM times ORDER BY id ASC;");
        for (let row of now.rows) {
            console.log(JSON.stringify(row));
        }
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

module.exports = { getAll };
