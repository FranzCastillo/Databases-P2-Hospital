const {Pool} = require('pg');
const {db} = require('./config');

const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.name,
})

console.log(db.name)

/*
postgres
DB_PASSWORD = "fer123"
DB_HOST = localhost
DB_PORT = 5432
DB_NAME = Hospital

*/

module.exports = pool;
