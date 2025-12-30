const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  text: String,
  type: {
    type: String,
    enum: ['text', 'image', 'link'],
    default: 'text'
  }
}, { timestamps: true });

module.exports = messageSchema;
