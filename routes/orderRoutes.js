const express = require('express');
const router = express.Router();

const { getTakenOrdersByGenie, createOrder } = require('../controllers/orderController');

router.get('/getTakenOrders', getTakenOrdersByGenie);
router.post('/createOrder', createOrder);

module.exports = router;