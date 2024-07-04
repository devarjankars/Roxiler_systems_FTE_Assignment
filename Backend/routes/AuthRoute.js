const express = require('express');
const { signup, login, getMe } = require('../controllers/Auth');
const { protect } = require('../middleware/Auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
