const User = require('../../models/User/User');
const joinModel = require('../../models/User/JoinRequest');
const Group = require('../../models/group/Group');
const JoinRequest = require('../../models/User/JoinRequest');
const Message = require('../../models/message/Message');


// REQUESTS FOR JOIN AND LEAVE GROUP
module.exports.joinGroupRequest = async (req , res , next) =>{
    try{
        const {groupId} = req.params;
        const {userId} = req.body
        const group = await Group.findById(groupId)
        if(!group) {
            res.status(404).json({message:"Group Not Found"})
        }
        const JoinRequestState = new JoinRequest ({
            userId:userId , 
            groupId:groupId
        })
        await JoinRequestState.save()
        res.status(200).json({message:"Join Request Sent"  , JoinRequest:JoinRequestState})
    }catch(error) {
        res.status(401).json({message:"Failed to Send Join Request"})
    }
}

module.exports.leaveGroup = async(req, res , next) => {
    try{
        const {groupId} = req.params;
const {userId} = req.body;
const group = await Group.findById(groupId)
if(!group) {
return res.status(404).json({message:"Group Not Found"});
}
const isMember = group.members.includes(userId);
if(!isMember) {
  return  res.status(404).json({message:"User is not Member of the Group"})
}
group.members = group.members.filter(memberId => memberId.toString() !== userId);
await group.save()
res.status(200).json({message:"User Left the Group"})
    }catch(error) {
        res.status(401).json({message:"Failed to Remove User" ,error:error.message})
    }

}

module.exports.sendMessage = async (req , res , next) =>{
try {
    const { sender , reciever , content} = req.body

const senderGroup = await Group.findOne({members:sender});
const recieverGroup = await Group.findOne({members:reciever});

if(!senderGroup || !recieverGroup || senderGroup._id !== recieverGroup._id) {
 return res.status(401).json({message:"Members are not at the same group"})
}
const newMessage = new Message({
    sender:sender,
    reciever:reciever , 
    content:content
})
await newMessage.save()
res.status(200).json({message:"Message sent Successfuly" , newMessage:newMessage})
}catch(error) {
    res.status(401).json({message:"Failed to Send Message"})
}
}

module.exports.viewGroupMembers = async (req , res , next) => {
const {groupId} = req.params;
const group = await Group.findById(groupId)
if(group) {
   return res.status(200).json({message:"here is you group members" , groupMembers:group.members})
} 
res.status(404).json({message:"Group not Found"});
}

module.exports.myProfile = (req , res , next) =>{
try {
const userProfile = req.user;
res.status(200).json(userProfile)
}catch(error) {
    res.status(404).json({message:"User not Found" , error:error.message})
}
}

module.exports.updateProfile = async (req , res) => {
    try {
        const userId = req.params;
        const {username , password} = req.body;
        const updatedUser = await User.findById(userId)
        updatedUser.username = username;
        updatedUser.password = password;
        await updatedUser.save()
        res.status(200).json({message:"user profile updated successfuly"})
    } catch(error) {
        res.status(401).json({error:error.message})
    } 
    

}