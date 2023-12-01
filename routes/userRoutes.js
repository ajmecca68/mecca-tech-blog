const express = require('express');
const router = express.Router();
const authController = require('../controllers/api/auth'); 

router.post('/register', authController.registerUser);

// Other authentication-related routes can be added here

module.exports = router;
