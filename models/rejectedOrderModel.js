const mongoose = require('mongoose');

const rejectedOrderSchema = new mongoose.Schema({
    listOfGeniesId: {
        type: [{
            genieId: { type: String},
            createdAt: {
                type: Date
            }
        }],
    },
});

const RejectedOrder = mongoose.model('RejectedOrder', rejectedOrderSchema);
module.exports = RejectedOrder;