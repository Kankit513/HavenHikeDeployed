const express = require('express');
const controllers = require('../controllers/admin-controller');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.get('/gethotels', verifyToken, verifyAdmin, controllers.getAllHotels);
router.get('/getrooms', verifyToken, verifyAdmin, controllers.getAllRooms);
router.get('/getusers', verifyToken, verifyAdmin, controllers.getAllUsers);
router.delete('/user/delete/:id', verifyToken, verifyAdmin, controllers.DeleteUserByAdmin);

module.exports = router;