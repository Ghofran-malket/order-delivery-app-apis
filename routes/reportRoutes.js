const express = require('express');
const router = express.Router();

const { report } = require('../controllers/reportController');

router.post('/create', report);

module.exports = router;