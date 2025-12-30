const mongoose = require('mongoose');
const messageSchema = require('./messageModel');

const chatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    messages: [messageSchema],
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;