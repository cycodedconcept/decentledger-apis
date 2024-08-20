const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;
if (!secretKey) console.log('JWT secret key not set. Check your .env file.');

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token format invalid' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });

        // Attach the decoded user information to the request object for use in the next middleware/route
        req.user = decoded;

        // Pass control to the next middleware/route handler
        next();
    });
};
