const jwt = require('jsonwebtoken');


const isAdmin = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
  try {
    const decodedToken = await jwt.verify(token , 'is association secret')
    if(decodedToken.role === 'admin') {
       return next()
    }
   return res.status(401).json({message:"Permission Denied , you are not an Admin"})
   
} catch (error) {
    res.status(401).json({message:"Failed to Pass Admin Middleware" , error:error.message})
  }
};

module.exports = { isAdmin };
