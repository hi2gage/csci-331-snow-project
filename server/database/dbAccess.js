const { Pool, Client } = require("pg");

const credentials = {
  user: "postgres",
  host: "db",
  database: "mainDB",
  password: "pass",
  port: 5432,
};

async function poolDemo() {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end();
    
    return now;
  }

async function getAll(personId) {
    const pool = new Pool(credentials);
    const text = `SELECT * FROM times ORDER BY id ASC`;
    return pool.query(text);
}


module.exports = { poolDemo, getAll };