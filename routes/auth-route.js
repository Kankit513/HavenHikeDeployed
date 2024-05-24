const express = require('express');
const controllers = require('../controllers/auth-controller');
const router = express.Router();

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get('/logout', controllers.logout);

module.exports = router;