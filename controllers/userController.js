const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const admin = require("../config/firebase");
const Order = require('../models/orderModel');

const registerUser = async (req, res) => {
    const { name, email, password, role, number, imagePath, city, country, languages, bio, token } = req.body;

    //check if user exist
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({message: 'Email is already exist'});

    const hashedpassword = await bcrypt.hash(password, 10);

    //create the user
    const user = await User.create({
        name: name,
        email: email,
        password: hashedpassword,
        role: role,
        number: number,
        imagePath: imagePath,
        city: city,
        country: country,
        languages: languages,
        bio: bio,
        token: token
    });

    if(user){
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            number: user.number,
            token: generateToken(user._id),
            imagePath: imagePath,
            city: city,
            country: country,
            languages: languages,
            bio: bio, 
            token: token
        });
    } else {
        res.status(400).json({message: 'invalid user data'});
    }

}

const loginUser = async (req, res) => {
    const { email, password, token } = req.body;

    const user = await User.findOne({ email });
    if ( user && bcrypt.compare(password, user.password)) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            number: user.number,
            token: token
        });
    }else {
        return res.status(400).json({message: 'Invalid email or password'});
    }
    
}

function generateInviteCode(userId) {
  return `INVITE-${userId}-${Date.now()}`;
}

const inviteFriend = async (req, res)=> {
    const userId = req.params.userId;
    const code = generateInviteCode(userId);

    const inviteLink = `https://algenie.com/invite?code=${code}`;
    res.json({ inviteLink });
}

const getUserInfo = async (req, res) => {
    try {
        const { userId } = req.query;
        if(userId == null){
            res.status(500).json({ error: 'the user id is null' });
        }
        const user = await User.findOne({_id: userId});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users info ' });
    }
}

const giveRating = async (req, res) => {
    try {
        const { customerId, rating } = req.query;
        if(customerId == null || rating == null){
            res.status(500).json({ error: 'Failed to fetch the order either the customerId or the rating is wrong' });
        }
        const updatedUser = await User.findOneAndUpdate(
            { _id: customerId },
            rating > 0 ? { $inc: { likeCount: rating } } : { $inc: { disLikeCount: rating } },
            { new: true } 
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update the rating value' });
    }
}

const sendNotification = async (req, res) => {
    try {
        const userId = req.body.userId;
        const orderId = req.body.orderId;
        const user = await User.findOne({_id: userId});
        const order = await Order.findOne({orderId: orderId});
        if (!user.token || !order) {
            return res.status(400).json({ error: "User has no FCM token" });
        }
        
        const message = {
            notification: {
                title: "New Message",
                body: "You received a message!",
            },
            token: user.token,
            data: {
                orderId: order.orderId,
                genieId: order.genieId,
                customerId: order.customerId,
                orderStatus: order.orderStatus,
                stores: JSON.stringify(order.stores),
                createdAt: String(order.createdAt),
                orderLocationLatitude: String(order.orderLocation.latitude),
                orderLocationLongitude: String(order.orderLocation.longitude),
                updatedAt: String(order.updatedAt),
                chargeService: order.chargeService,
                note: order.note,
                receiptValue: order.receiptValue,
                genieProgressStoreIndex: String(order.genieProgress.storeIndex),
                genieProgressStep: String(order.genieProgress.step),
                genieProgressLastUpdated: String(order.genieProgress.lastUpdated)
            }
        };

        const response = await admin.messaging().send(message);
        console.log("Notification sent:", response);
        res.json({ success: true, message: message });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.json({ success: false });
    }
}

module.exports = { registerUser, loginUser, inviteFriend, getUserInfo, giveRating, sendNotification};