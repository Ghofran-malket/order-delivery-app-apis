const express = require('express');
const router = express.Router();

const { getTakenOrdersByGenie, createOrder, updateStoreStatus, getOrderById, updateOrder, updateOrderStatus,
     updateGenieProgress, getGenieCurrentOrder, completeOrder
 } = require('../controllers/orderController');

router.get('/getTakenOrders', getTakenOrdersByGenie);
router.post('/createOrder', createOrder);
router.put('/updateStoreStatus', updateStoreStatus);
router.get('/getOrderById', getOrderById);
router.put('/updateOrder', updateOrder);
router.put('/updateOrderStatus', updateOrderStatus);
router.put("/progress", updateGenieProgress);
router.get("/genie/current", getGenieCurrentOrder);
router.put("/complete", completeOrder);

module.exports = router;