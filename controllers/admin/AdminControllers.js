const User = require('../../models/User/User')
const Group = require('../../models/group/Group')

module.exports.viewAllUsers = async(req , res) =>{
    console.log('req res')
    const users = await User.find({})
    res.status(200).json({message:users})

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
        const groups = await Group.find({})
        if (!groups || groups.length === 0) {
            return res.status(404).json({ message: "No Group Found" });
        }
        const groupsDetails = groups.map(group => ({
            groupId:group._id , 
            groupName:group.name , 
            groupOwner:group.owner , 
            groupMembers:group.members
        }))
        res.status(200).json({ groups: groupsDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

    next();
};

module.exports.updateOwner = async (req , res , next) => {
    
    const {groupId} = req.params;
    const {owner} = req.body
    const findGroup = await Group.findById(groupId) 
    console.log(findGroup) 
    if(!findGroup) {
        return res.status(404).json({message:"Group Does Not Exist"})
    }
  findGroup.owner = owner;
  const updatedGroup = await findGroup.save()
  res.status(200).json({message:"Group owner Updated" , updatedGroup:updatedGroup})
}


module.exports.updateUserRole = async (req , res , next) => {
const {userId} = req.params;
const {role} = req.body;
const user = await User.findById(userId);
if(!user) {
    return res.status(404).json({message:"User not Found"})
}
user.role = role
const updatedUser = await user.save()
res.status(200).json({message:"Users Role Updated Successfuly" , user:updatedUser})

}

module.exports.deleteGroup = async (req , res ) =>{
    try{
        const {groupId} = req.params;
        const deleteGroup = await Group.findByIdAndDelete(groupId)
        return res.status(200).json({message:"Group deleted" , deletedGroup:deleteGroup})
    } catch(error) {
        res.status(401).json({message:"Failed to Delete" , error:error.message})

    }


}