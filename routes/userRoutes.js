const express = require('express');
const router = express.Router();

const { registerUser, loginUser, inviteFriend} = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/invite-link/:userId', inviteFriend);

module.exports = router;