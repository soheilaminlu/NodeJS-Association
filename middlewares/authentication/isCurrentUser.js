const User = require('../../models/User/User')
const jwt = require('jsonwebtoken')
const isCurrentUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        const decodedToken = await jwt.verify(token, 'is association secret');
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        res.locals.user = user
       console.log('User:', user);
       next();
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {isCurrentUser}