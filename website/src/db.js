const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'p2-hospital.cnwcklyyoav5.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'Hospital',
})

module.exports = pool;