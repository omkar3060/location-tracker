const express = require('express');
const { saveLocation } = require('../controllers/locationController');

const router = express.Router();

router.post('/', saveLocation);  // POST /locations

module.exports = router;
