const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, email, password, role, number } = req.body;

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
        number: number
    });

    if(user){
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            number: user.numer
        });
    } else {
        res.status(400).json({message: 'invalid user data'});
    }

}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if ( user && bcrypt.compare(password, user.password)) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            number: user.number
        });
    }else {
        return res.status(400).json({message: 'Invalid email or password'});
    }
    
}

module.exports = { registerUser, loginUser};