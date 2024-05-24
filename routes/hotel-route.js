const express = require('express');
const controllers = require('../controllers/hotel-controller');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post('/create', verifyToken, verifyAdmin, controllers.createHotel);
router.delete('/delete/:id', verifyToken, verifyAdmin, controllers.deleteHotel);
router.post('/update/:id', verifyToken, verifyAdmin, controllers.updateHotel);
router.get('/get/:id', controllers.getHotel);
router.get('/get', controllers.getHotels);
router.get('/room/:id', controllers.getHotelRooms);
router.get('/getall', controllers.getAllHotels);

module.exports = router;
