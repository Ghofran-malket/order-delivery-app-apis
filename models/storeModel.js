const mongoose = require('mongoose');
const itemSchema = require('./itemModel');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    items: [itemSchema],
    storeStatus: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending',
    },
    storeLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
});

module.exports = storeSchema;