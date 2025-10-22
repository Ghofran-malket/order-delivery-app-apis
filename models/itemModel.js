const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
});

module.exports = itemSchema;