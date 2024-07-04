const express = require('express');
const { getUsers, updatePassword } = require('../controllers/User');
const { protect } = require('../middleware/Auth');
const router = express.Router();

router.get('/', protect, getUsers);
router.put('/password', protect, updatePassword);

module.exports = router;
