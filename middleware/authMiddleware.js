const jwt = require('jonwebtoken');

// to authorize some routes to specific users 
const protect = async (req, res, next) => {
    let token;
    if(req.header.authorization && req.header.authorization.startWith('Bearer')){

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            next();
        }catch{
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}

module.exports = {protect };