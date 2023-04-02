const pool = require('../db');

const getTables = async (req, res) => {
    const result = await pool.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
    res.json(result.rows);
}

const getTestTable = async (req, res) => {
    const result = await pool.query('SELECT * FROM test');
    res.json(result.rows);
};

const getUsers = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const queryResult = await pool.query('' +
            'INSERT INTO usuarios (username, password_hash) ' +
            'VALUES ($1, crypt($2, gen_salt(\'bf\'))) RETURNING *', // gen_salt('bf') is a pgcrypto function to salt the hash of the password
            [username, password]);
        res.status(204);
    } catch (error) {
        next(error);
    }
}

const findUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const queryResult = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (queryResult.rows.length === 0) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(queryResult.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTables,
    getTestTable,
    getUsers,
    createUser,
    findUser,
}