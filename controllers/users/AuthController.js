const User = require('../../models/User/User')
const createToken = require('../../configs/Jwt')
const bcrypt = require('bcrypt')



module.exports.signupUser = async (req , res , next) =>{
    const {username , password , role} = req.body;
    try{
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password , salt)
        const user = await User.create({username , password:hashedPassword  , role}); 
        if(User.exists ({
            username:username , 
            password:password
        })) {
            return res.status(403).json({message:"User already Exist"});
        }
        const token = createToken(user._id , user.role)
        res.cookie('jwt' , token  , {httpOnly:true})
        await user.save();
         res.status(200).json({message:'Signup Successful' , user:user._id}) 
    }catch(e) {
        console.log(e.message);
        res.status(401).json("Failed to Signup ");
    }
   
};

module.exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }
          
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            console.log(passwordMatch)
        }
        const token = createToken(user._id , user.role)
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).json({ message: 'Login Successful', user: { username: user.username, role: user.role , id:user._id } });

    
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports.logoutUser = async (req, res, next) => {
    try {
      res.cookie('jwt', '', { maxAge: 1 });
      res.status(200).json("GoodBye")
      next();
    } catch (err) {    
      res.status(400).json({ message: "Logout Error", error: err.message });
    }
  };
  

