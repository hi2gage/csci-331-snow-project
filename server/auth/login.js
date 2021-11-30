const { Pool, Client } = require("pg");
const bcrypt = require("bcrypt");

const credentials = {
    user: "postgres",
    host: "db",
    database: "mainDB",
    password: "pass",
    port: 5432,
};

async function checkAuth(body) {
    return new Promise(function (resolve, reject) {
        let userGetter = getUser(body.email)
        userGetter.then(function (user) {
            if (user.length === 0) {
                console.log("Invalid credintals")
                resolve(false)
            }
            else {
                const validPassword = bcrypt.compare(body.password, user[0].password);
                if (validPassword) {
                    console.log("Correct login")
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            }
        })




    })
}

async function getUser(email) {
    if (process.env.LOCAL_OR_HEROKU == "local") {
        console.log("Hit the API");
        const client = new Client(credentials);
        await client.connect();

        console.log(email)
        var sql = "SELECT * FROM users WHERE email = ANY ($1) ORDER BY id ASC;";
        const user = await client.query(sql, [[email]]);
        await client.end();
        console.log(user.rows)
        return user.rows;

    // TODO: Need to figure this out for connecting to the database for HEROKU
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



module.exports = { checkAuth };