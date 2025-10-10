const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    genieId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true,
        default: "customerId"
    },
    orderStatus: {
        type: String,
        enum: ['unpublished' , 'published', 'matching', 'pending', 'taken', 'rejected', 'canceled', 'delivered', 'new', 'archived'],
        default: 'unpublished',
        required: [true, 'Please enter your role']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    orderLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    updatedAt: {
        type: Date
    }
    
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;