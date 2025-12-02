const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
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
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reports: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;