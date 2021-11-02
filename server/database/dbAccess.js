const { Pool, Client } = require("pg");

if(!process.env.LOCAL_OR_HEROKU === 'local') {

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

} 
else {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
      
      client.connect();
      
      client.query('SELECT * FROM times ORDER BY id ASC;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
        return res;
      });
}


module.exports = { poolDemo, getAll };