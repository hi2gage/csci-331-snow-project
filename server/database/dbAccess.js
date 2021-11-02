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
    console.log("We are on local");
    const pool = new Pool(credentials);
    const text = `SELECT * FROM times ORDER BY id ASC`;
    return pool.query(text);
  
} 
  else {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    client.connect();

    client.query("SELECT * FROM times ORDER BY id ASC;", (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
      return res;
    });
  }
}

module.exports = { getAll };
