const { Pool, Client } = require("pg");
const bcrypt = require("bcrypt");

const credentials = {
    user: "postgres",
    host: "db",
    database: "mainDB",
    password: "pass",
    port: 5432,
};

async function register(body) {
    return new Promise(function (resolve, reject) {
        let userGetter = getUser(body.email)
        userGetter.then(function (user) {
            if (user.length != 0) {
                console.log("Alread exists with this email")
                resolve(false)
            }
            else {
                createUser(body)
                resolve(true)
            }
        })
    })
}

async function createUser(userInfo) {
    if (process.env.LOCAL_OR_HEROKU == "local") {
        console.log("Creating new user locally");
        const client = new Client(credentials);
        await client.connect();

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(userInfo.password, salt);
        const values = [userInfo.first, userInfo.last, userInfo.email, pass]

        let sql = "INSERT INTO users (first, last, email, password) VALUES($1, $2, $3, $4);"

        console.log(values)
        let user = await client.query(sql, values);
        await client.end();
        console.log(user.rows)
    }
    else {
        console.log("Creating new user on Heroku");

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        await client.connect();

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(userInfo.password, salt);
        const values = [userInfo.first, userInfo.last, userInfo.email, pass]

        let sql = "INSERT INTO users (first, last, email, password) VALUES($1, $2, $3, $4);"

        console.log(values)
        let user = await client.query(sql, values);
        await client.end();
        console.log(user.rows)
    }





}

async function getUser(email) {
    if (process.env.LOCAL_OR_HEROKU == "local") {
        console.log("Getting user by email locally");
        const client = new Client(credentials);
        await client.connect();

        console.log(email)
        var sql = "SELECT * FROM users WHERE email = ANY ($1) ORDER BY id ASC;";
        const user = await client.query(sql, [[email]]);
        await client.end();
        console.log(user.rows)
        return user.rows;

        // TODO: Need to figure this out for connecting to the database for HEROKU
    }
    else {
        console.log("Getting user by email on Heroku");
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        await client.connect();

        console.log(email)
        var sql = "SELECT * FROM users WHERE email = ANY ($1) ORDER BY id ASC;";
        const user = await client.query(sql, [[email]]);
        await client.end();
        console.log(user.rows)
        return user.rows;

    }


}



module.exports = { register };