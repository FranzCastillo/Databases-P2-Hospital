const {Router} = require('express');
const {getTestTable, getUsers, createUser, findUser, getTables} = require('../controllers/table.controllers');

const router = Router();
router.get('/tables', getTables);
router.get('/tests', getTestTable);

router.get('/users', getUsers);
router.get('/users/:id', findUser);
router.post('/users', createUser);

module.exports = router;