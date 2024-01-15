const jwt = require('jsonwebtoken');
const User = require('../../models/User/User');

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
    
        jwt.verify(token, 'is association secret', async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized User", error: err.message });
            }
            console.log(decodedToken);
            const user = await User.findById(decodedToken.id);
            return res.status(200).json({ message: "User is Valid" , username:user.username });
            
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {isAuth};
