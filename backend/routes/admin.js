const express = require('express');
const { getAllUsers, getUserLocations } = require('../controllers/adminController');
const router = express.Router();

// Admin routes
router.get('/users', getAllUsers);  // Fetch all users
router.get('/locations/:userId', getUserLocations);  // Fetch user location logs by ID

module.exports = router;
