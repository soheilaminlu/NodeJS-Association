const User = require('../../models/User/User')
const Group = require('../../models/group/Group')

module.exports.viewAllUsers = async(req , res , next) =>{
    console.log('req res')
    const users = await User.find({})
    res.status(200).json({message:users})
    next()
}

module.exports.viewUserDetails = async (req , res , next) =>{
    const {userId} = req.params;
    const user = await User.findById(userId)
    if(user) {
        console.log(user)
        res.status(200).json(user)
        next()
    } else {
        res.status(401).json("User Undefined")
    }
    
}

module.exports.createGroup = async (req , res , next) => {
    const {name , owner} = req.body
const newGroup = await Group.create ({
    name:name,
    owner: owner
})
await newGroup.save()
if(newGroup) {
    res.status(200).json({group:newGroup})
} else {
    res.status(401).json({message: "Group Undefined"})
}

}

module.exports.viewAllGroups = async (req, res, next) => {
    try {
        const groups = await Group.find({});

        if (!groups || groups.length === 0) {
            return res.status(404).json({ message: "No Group Found" });
        }

        res.status(200).json({ groups: groups });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

    next();
};

module.exports.updateOwner = async (req , res , next) => {
    console.log('req res')
    const {groupId} = req.params;
    const ownerId = req.body;
    const group = await Group.findByIdAndUpdate(groupId , {owner:ownerId} , {new:true})  
    res.status(200).json({group:groupUpdate})
    next()
}