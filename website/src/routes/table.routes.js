const {Router} = require('express');
const {getTestTable, getUsers, createUser} = require('../controllers/table.controllers');

const router = Router();

router.get('/tests', getTestTable);

router.get('/users', getUsers);

router.post('/users', createUser);

module.exports = router;