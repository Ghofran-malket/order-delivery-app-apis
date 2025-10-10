const Order = require('../models/orderModel.js');

const getTakenOrdersByGenie = async (req, res) => {
    try {
        const { genieId} = req.query;
        if(genieId == null){
            res.status(500).json({ error: 'Failed to fetch genieId' });
        }
        const orders = await Order.find({genieId: genieId, orderStatus: 'taken'}).sort({ createdAt: -1 }); // latest first
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}

const createOrder = async (req, res) => {
    const order = await Order.create({
        orderId: 'orderId',
        genieId: 'genieId',
        customerId: 'customerId',
        orderStatus: 'unpublished',
        createdAt: Date.now(),
        orderLocation: {
            latitude: '33.5464989',
            longitude: '43.5545818'
        },
        updatedAt: Date.now()
    });

    if(order){
        res.status(201).json({
            orderId: order.orderId,
            genieId: order.genieId,
            orderStatus: order.orderStatus,
            createdAt: order.createdAt
        });
    } else {
        res.status(400).json({message: 'invalid order data'});
    }
}

module.exports = { getTakenOrdersByGenie, createOrder };
