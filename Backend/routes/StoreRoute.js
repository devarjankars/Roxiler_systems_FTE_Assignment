const express = require('express');
const { addStore, getStores, submitRating } = require('../controllers/store');
const { protect } = require('../middleware/Auth');
const router = express.Router();

router.post('/', protect, addStore);
router.get('/', protect, getStores);
router.post('/rating', protect, submitRating);
router.post('/add-store',addStore)

module.exports = router;
