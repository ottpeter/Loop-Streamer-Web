const Pool = require('pg').Pool;
require('dotenv').config();


//Password should be stored in .env file, or something like that.s
const pool = new Pool({
    user: "dbadmin",
    password: process.env.DB_PASS,
    host: "127.0.0.1",
    port: 5432,
    database: ""
});

module.exports = pool;