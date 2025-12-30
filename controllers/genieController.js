const OnlineGenie = require('../models/onlineGenieModel.js');
const Order = require('../models/orderModel.js');
const RejectedOrder = require('../models/rejectedOrderModel.js');

const goOnline = async (req, res) => {
    const { userId, token, latitude, longitude } = req.body;
    let onlineGenie = await OnlineGenie.findOne({_id: userId});
    if(!onlineGenie){
        //create a doc in online genie collection
        onlineGenie = await OnlineGenie.create({
            _id: userId,
            token: token,
            onlineSince: Date.now(),
            isBusy: false,
            BusyWith: "",
            BusySince: "",
            lastSeen: Date.now(),
            coordinates: {
                latitude: latitude,
                longitude: longitude
            }

        });
    }

    if(onlineGenie){
        res.status(201).json({
            _id: onlineGenie.userId,
            token: onlineGenie.token,
            onlineSince: onlineGenie.onlineSince,
            isBusy: onlineGenie.isBusy,
            BusyWith: onlineGenie.BusyWith,
            BusySince: onlineGenie.BusySince,
            lastSeen: onlineGenie.lastSeen,
            position: onlineGenie.position
        });
    } else {
        res.status(400).json({message: 'invalid online genie data'});
    }
    
}

const goOffline = async (req, res) => {
    try {
      const onlineGenie = await OnlineGenie.findById(req.params.userId);
      if (!onlineGenie) return res.status(404).json({ message: 'onlineGenie not found' });

      await onlineGenie.deleteOne();
      res.json({ message: 'onlineGenie deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid onlineGenie ID' });
    }

}

const isGenieOnline = async (req, res) => {
    const userId = req.params.userId;
    const onlineGenie = await OnlineGenie.findOne({_id: userId});
    if(!onlineGenie){
        res.status(200).json({isOnline: false, message: 'the genie is not online'});
    }
    res.status(200).json({isOnline: true, message: 'the genie is online'});    
}

const acceptOrder = async (req, res) => {
    try {
        const { userId, orderId } = req.body;
        if(orderId == null || userId == null){
            res.status(500).json({ error: 'either the orderId or the userId is wrong' });
        }
        await OnlineGenie.updateOne(
            {_id: userId},
            {$set: {"isBusy": true, "BusyWith": orderId, "BusySince": Date.now()}},
            { new: true }
        );
        await Order.updateOne(
            {orderId: orderId},
            {$set: {"genieId": userId, "orderStatus": "taken", "genieProgress.step": "genieHome", "updatedAt": Date.now()}},
            { new: true }
        );
        res.status(200).json({message: 'the genie accept the order'}); 
    } catch (error) {
        res.status(500).json({ error: 'failed to acceptOrder' }); 
    }   
}

const rejectOrder = async (req, res) => {
    try {
        const { userId, orderId } = req.body;
        if(orderId == null || userId == null){
            res.status(500).json({ error: 'either the orderId or the userId is wrong' });
        }
        const rejectedOrder = await RejectedOrder.updateOne(
            { _id: orderId },
            { $push: { listOfGeniesId: { genieId: userId, createdAt: Date.now() }} },
            { upsert: true }
            
        );
        if(rejectedOrder){
            res.status(201).json({message: 'the rejected order doc has been created'}); 
        }
        
    } catch (error) {
        res.status(500).json({ error: 'failed to rejectOrder' + error }); 
    }   
}

module.exports = { goOnline, goOffline, isGenieOnline, acceptOrder, rejectOrder };
