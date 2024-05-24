const express = require('express');
const controllers = require('../controllers/booking-controller');
const { verifyToken } = require('../utils/middleware');
const router = express.Router();

router.post('/create', verifyToken, controllers.createBooking);
router.get('/getbookingbyuserid/:id', verifyToken, controllers.getBookingsByUserId);

module.exports = router;