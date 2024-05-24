const express = require('express');
const controllers = require('../controllers/user-controller');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post('/update/:id', verifyToken, controllers.updateUser)
router.delete('/delete/:id', verifyToken, controllers.deleteUser)
router.get('/listings/:id', verifyToken, controllers.getUserHotels)
router.get('/:id', verifyToken, controllers.getUser)
router.get("/",verifyToken, verifyAdmin, controllers.getUsers)

module.exports = router;
