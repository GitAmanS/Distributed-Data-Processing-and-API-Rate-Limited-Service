const express = require('express');
const rateLimiter = require('../middleware/rateLimiter');
const { processDataRequest } = require('../controllers/dataProcessingController');

const router = express.Router();

router.post('/process', rateLimiter, processDataRequest);

module.exports = router;
