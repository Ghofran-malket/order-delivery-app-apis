const mongoose = require('mongoose');

const onlineGenieSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    onlineSince: {
        type: Date,
        default: Date.now
    },
    isBusy: {
        type: Boolean,
        default: false,
        required: true
    },
    BusyWith: {
        type: String,
        default: ''
    },
    BusySince: {
        type: String,
        default: ''
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }
    
});

const OnlineGenie = mongoose.model('OnlineGenie', onlineGenieSchema);
module.exports = OnlineGenie;