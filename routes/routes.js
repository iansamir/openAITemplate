const express = require('express');
const { generateImage, generateText } = require('../controllers/responseGenerator.js');
const router = express.Router();

router.post('/', generateText);

module.exports = router;