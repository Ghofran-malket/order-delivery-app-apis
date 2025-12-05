const express = require('express');
const router = express.Router();

const { goOnline, goOffline, isGenieOnline, acceptOrder, rejectOrder } = require('../controllers/genieController');

router.post('/goOnline', goOnline);
router.delete('/goOffline/:userId', goOffline);
router.get('/isOnline/:userId', isGenieOnline);
router.put('/acceptOrder', acceptOrder);
router.post('/rejectOrder', rejectOrder);
module.exports = router;