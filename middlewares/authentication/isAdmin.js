const jwt = require('jsonwebtoken');
const User = require('../../models/User/User');

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, 'is association secret');
        

        const user = await User.findById(decodedToken.id);

        if (user.role === 'admin') {
        return   res.status(200).json({ message: "Welcome to the Admin Panel" });
           
        } else {
           return res.status(401).json({ message: "Permission Denied, you are Not an Admin" });
        }
    } catch (error) {
        console.error("Error in isAdmin middleware:", error.message);
      return  res.status(401).json({ message: "Permission Denied, you are not an Admin", error: error.message });
    }
};

module.exports = { isAdmin };
