const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        jwt.verify(token, 'is association secret', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized User", error: err.message });
            }
            console.log(decodedToken)
            res.status(200).json({ message: "User is Valid" });
            next()
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {isAuth};
