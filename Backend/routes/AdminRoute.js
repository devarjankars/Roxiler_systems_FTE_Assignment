const express = require('express');
const { getDashboard, addUser, getUsers } = require('../controllers/Admin');
const { protect, admin } = require('../middleware/Auth');
const router = express.Router();

router.get('/dashboard', protect, admin, getDashboard);
router.post('/add-user', protect, admin, addUser);
router.get('/users', protect, admin, getUsers);

module.exports = router;
