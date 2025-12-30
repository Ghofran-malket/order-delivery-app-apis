const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    expireDate: {
        type: Date
    }, 
    category: {
        type: String,
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
