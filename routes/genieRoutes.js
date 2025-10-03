const express = require('express');
const router = express.Router();

const { goOnline } = require('../controllers/genieController');

router.post('/goOnline', goOnline);

module.exports = router;