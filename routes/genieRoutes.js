const express = require('express');
const router = express.Router();

const { goOnline, goOffline, isGenieOnline } = require('../controllers/genieController');

router.post('/goOnline', goOnline);
router.delete('/goOffline/:userId', goOffline);
router.get('/isOnline/:userId', isGenieOnline);

module.exports = router;