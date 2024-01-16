const jwt = require('jsonwebtoken');
const User = require('../../models/User/User');

const isAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }

    try {
       const decoded = jwt.verify(token , 'is association secret' );
       const user = await User.findById(decoded.id)
       if(!user) {
      return res.status(404).json({message:"User not Found"})
       }
       req.user = user;
       next();
    }catch(error) {
    res.status(401).json({message:"Failed to Authenticate" , error:error.message})
  }
  }

module.exports = {isAuth};
