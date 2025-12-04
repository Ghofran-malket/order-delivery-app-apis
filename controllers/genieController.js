const OnlineGenie = require('../models/onlineGenieModel.js');

const goOnline = async (req, res) => {
    const { userId, token, latitude, longitude } = req.body;
    const onlineGenie = await OnlineGenie.findOne({_id: userId});
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


module.exports = { goOnline, goOffline, isGenieOnline };
