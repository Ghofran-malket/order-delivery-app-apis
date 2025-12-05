const express = require('express');
const router = express.Router();

const { goOnline, goOffline, isGenieOnline, acceptOrder } = require('../controllers/genieController');

router.post('/goOnline', goOnline);
router.delete('/goOffline/:userId', goOffline);
router.get('/isOnline/:userId', isGenieOnline);
router.put('/acceptOrder', acceptOrder);

module.exports = router;