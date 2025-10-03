const OnlineGenie = require('../models/onlineGenieModel.js');

const goOnline = async (req, res) => {
    const { userId, token, latitude, longitude } = req.body;

    //create a doc in online genie collection
    const onlineGenie = await OnlineGenie.create({
        _id: userId,
        token: token,
        onlineSince: new Date(),
        isBusy: false,
        BusyWith: "",
        BusySince: "",
        lastSeen: new Date()

    });

    if(onlineGenie){
        res.status(201).json({
            _id: onlineGenie.userId,
            token: onlineGenie.token,
            onlineSince: onlineGenie.onlineSince,
            isBusy: onlineGenie.isBusy,
            BusyWith: onlineGenie.BusyWith,
            BusySince: onlineGenie.BusySince,
            lastSeen: onlineGenie.lastSeen
        });
    } else {
        res.status(400).json({message: 'invalid online genie data'});
    }
    
}


module.exports = { goOnline };
