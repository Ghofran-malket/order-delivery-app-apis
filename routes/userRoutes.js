const express = require('express');
const router = express.Router();

const { registerUser, loginUser, inviteFriend, getUserInfo, giveRating, sendNotification} = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/invite-link/:userId', inviteFriend);
router.get('/info', getUserInfo);
router.put('/rate', giveRating);
router.post('/sendNotification', sendNotification);

module.exports = router;