const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token =  req.session.token;
    if (!token) return res.status(401).json({message: "Access denied. No token provided"}); 
    const JWT_SECRET = process.env.JWT_SECRET;
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) {
            res.status(400).json({message: "Invalid Token"});
        } else {
            req.user = data;
            next();
        }
    })
}

module.exports = auth;