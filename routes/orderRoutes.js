const express = require('express');
const router = express.Router();

const { getTakenOrdersByGenie, createOrder, updateStoreStatus } = require('../controllers/orderController');

router.get('/getTakenOrders', getTakenOrdersByGenie);
router.post('/createOrder', createOrder);
router.put('/updateStoreStatus', updateStoreStatus);

module.exports = router;