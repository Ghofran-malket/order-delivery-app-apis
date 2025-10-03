const express = require('express');
const router = express.Router();

const { goOnline, goOffline } = require('../controllers/genieController');

router.post('/goOnline', goOnline);
router.delete('/goOffline/:userId', goOffline);

module.exports = router;