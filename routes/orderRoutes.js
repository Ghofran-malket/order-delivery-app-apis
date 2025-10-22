const express = require('express');
const router = express.Router();

const { getTakenOrdersByGenie, createOrder, updateStoreStatus, getOrderById } = require('../controllers/orderController');

router.get('/getTakenOrders', getTakenOrdersByGenie);
router.post('/createOrder', createOrder);
router.put('/updateStoreStatus', updateStoreStatus);
router.get('/getOrderById', getOrderById);

module.exports = router;