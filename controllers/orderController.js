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
        stores: [
            {
                name: "Store A",
                title: "Title",
                items: [
                    { title: "Milk", quantity: "3" },
                    { title: "Banana", quantity: "2" }
                ],
                storeStatus: "pending",
                storeLocation: {
                    latitude: '33.5464989',
                    longitude: '43.5545818'
                },
            },
            {
                name: "Store B",
                title: "Title",
                items: [
                    { title: "Meat", quantity: "8" }
                ],
                storeStatus: "pending",
                storeLocation: {
                    latitude: '33.5464989',
                    longitude: '43.5545818'
                },
            }
        ],
        createdAt: Date.now(),
        orderLocation: {
            latitude: '33.5464989',
            longitude: '43.5545818'
        },
        updatedAt: Date.now(),
        chargeService: '50',
        note: 'Note',
        receiptValue: '0'
    });

    if(order){
        res.status(201).json({
            orderId: order.orderId,
            genieId: order.genieId,
            orderStatus: order.orderStatus,
            createdAt: order.createdAt,
            stores: [
                order.stores.every,
                order.stores[0]._id
            ]
        });
    } else {
        res.status(400).json({message: 'invalid order data'});
    }
}

const updateStoreStatus = async (req, res) => {
    try {
        const { orderId, storeId } = req.query;
        if(orderId == null || storeId == null){
            res.status(500).json({ error: 'Failed to fetch the store either the orderId or the storeId is wrong' });
        }
        await Order.updateOne(
            { orderId: orderId },
            {$set: {"stores.$[store].storeStatus": "done"}},
            {arrayFilters: [{ "store._id": storeId }]}
        );
        res.status(200).json({message: 'Store status is updated for'+ storeId});
    } catch (err) {
        res.status(500).json({ error: 'Failed to update store status' });
    }
}

module.exports = { getTakenOrdersByGenie, createOrder, updateStoreStatus};
