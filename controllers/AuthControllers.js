const User = require('../models/User');
const bcrypt = require('bcrypt')

module.exports.loginUser = (req , res , next) =>{
    
}

module.exports.signupUser = async (req , res , next) =>{
    const {username , password , role} = req.body;
    try{
        const user = await new User({username , password , role});
        await user.save()
   res.status(200).json({message:'User registred' , user:user}) 
    }catch(e) {
        console.log(e.message);
        res.status(401).json("Failed to Signup ");
    }
   
}

module.exports.logoutUser = (req , res , next) =>{
    
}

module.exports.getAdminPanel = (req , res , next) =>{
    
}