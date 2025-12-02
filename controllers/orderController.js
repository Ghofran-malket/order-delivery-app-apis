const Order = require('../models/orderModel.js');

const getTakenOrdersByGenie = async (req, res) => {
    try {
        const { genieId} = req.query;
        if(genieId == null){
            res.status(500).json({ error: 'Failed to fetch genieId' });
        }
        const orders = await Order.find({genieId: genieId, orderStatus: 'taken'}).sort({ createdAt: -1 }); // latest first
        
        //if (!orders) return res.json({ active: false });
        res.status(200).json({
            active: true,
            orders: orders,
        });
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
        receiptValue: '0',
        genieProgress: {
            step: "genieHome" , // current screen
            storeIndex: 0,
            lastUpdated: Date.now(),
        },
    });

    if(order){
        res.status(201).json({
            orderId: order.orderId,
            genieId: order.genieId,
            orderStatus: order.orderStatus,
            createdAt: order.createdAt,
            stores: [
                order.stores,
                order.stores[0]._id
            ],
            genieProgress: {
                step: order.genieProgress.step, // current screen
                storeIndex: order.genieProgress.storeIndex,
                lastUpdated: order.genieProgress.lastUpdated,
            },
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

const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.query;
        if(orderId == null){
            res.status(500).json({ error: 'the order id is null' });
        }
        const order = await Order.findOne({orderId: orderId});
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch the order' });
    }
}

const updateOrder = async (req, res) => {
    try {
        const { receiptValue, orderId } = req.query;
        if(orderId == null || receiptValue == null){
            res.status(500).json({ error: 'Failed to fetch the order either the orderId or the receiptValue is wrong' });
        }
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: orderId },
            {$set: {"receiptValue": receiptValue}},
            { new: true } 
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update the receiptValue' });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, orderId } = req.query;
        if(orderId == null || orderStatus == null){
            res.status(500).json({ error: 'Failed to fetch the order either the orderId or the orderStatus is wrong' });
        }
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: orderId },
            {$set: {"orderStatus": orderStatus}},
            { new: true } 
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update the orderStatus' });
    }
}

const updateGenieProgress = async (req, res) => {
  const { orderId } = req.query;
  const { step, storeIndex } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          "genieProgress.step": step,
          "genieProgress.storeIndex": storeIndex,
          "genieProgress.lastUpdated": new Date(),
        },
      },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({
      success: true,
      progress: order.genieProgress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Genie’s current active order
const getGenieCurrentOrder = async (req, res) => {
  const { genieId } = req.query;

  try {
    const order = await Order.findOne({
      genieId,
      orderStatus: "taken", // active order
    });

    if (!order) return res.json({ active: false });

    res.status(200).json({
      active: true,
      order: order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset progress when order complete
const completeOrder = async (req, res) => {
  const { orderId } = req.query;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          orderStatus: "delivered",
          "genieProgress.step": "genieHome",
          "genieProgress.storeIndex": 0,
          "genieProgress.lastUpdated": new Date(),
        },
      },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getTakenOrdersByGenie, createOrder, updateStoreStatus, getOrderById, updateOrder, 
    updateOrderStatus, updateGenieProgress, getGenieCurrentOrder, completeOrder};
