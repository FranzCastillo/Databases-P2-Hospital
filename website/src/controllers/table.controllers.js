const pool = require('../db');
const getTestTable = async (req, res) => {
    const result = await pool.query('SELECT * FROM test');
    res.json(result.rows);
};

const getUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
}

const createUser = async (req, res) => {
    const {usuario, password} = req.body;

    const queryResult = await pool.query('' +
        'INSERT INTO usuarios (username, password_hash) ' +
        'VALUES ($1, crypt($2, gen_salt(\'bf\'))) RETURNING *', // gen_salt('bf') is a pgcrypto function to salt the hash of the password
        [usuario, password]);
    res.json(queryResult.rows[0]);
}

module.exports = {
    getTestTable,
    getUsers,
    createUser
}