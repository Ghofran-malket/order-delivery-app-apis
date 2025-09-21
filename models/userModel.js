const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    role: {
        type: String,
        enum: ['genie', 'customer'],
        default: 'customer',
        required: [true, 'Please enter your role']
    },
    number: {
        type: String,
        required: [true, 'Please enter your number']
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;