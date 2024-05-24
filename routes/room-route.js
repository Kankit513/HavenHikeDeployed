const express = require('express');
const controllers = require('../controllers/room-controller');
const { verifyToken, verifyAdmin } = require("../utils/middleware");
const router = express.Router();


//CREATE

router.post('/create', verifyToken, verifyAdmin, controllers.createRoom);

//UPDATE

router.put('/availability/:id', controllers.updateRoomAvailability);
router.put('/update/:id', verifyToken, verifyAdmin, controllers.updateRoom);

//DELETE

router.delete('/delete/:id/:hotelid', verifyToken, verifyAdmin, controllers.deleteRoom);

//GET

router.get('/:id', controllers.getRoom);

//GET ALL

router.get('/', controllers.getRooms);

module.exports = router;