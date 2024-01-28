const User = require('../../models/User/User');
const Group = require('../../models/group/Group');
const JoinRequest = require('../../models/User/JoinRequest');
const Message = require('../../models/message/Message');


// REQUESTS FOR JOIN AND LEAVE GROUP

    module.exports.joinGroupRequest = async (req, res, next) => {
        try {
          const { groupId } = req.params;
          const { userId } = req.body;
      
          // Check if the group exists
          const group = await Group.findById(groupId);
      
          if (!group) {
            return res.status(404).json({ message: "Group Not Found" });
          }
      
          // Create a join request
          const joinRequest = new JoinRequest({
            userId: userId,
            groupId: groupId,
          });
      
          // Save the join request
          await joinRequest.save();
      
          // Update the group with the join request
         await Group.findByIdAndUpdate(groupId , {$push : {joinRequests:joinRequest}})
      
          res.status(200).json({ message: "Join Request Sent", joinRequest: joinRequest });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Failed to Send Join Request", error: error.message });
        }
      };


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
  const {groupId , recieverId} = req.params;
  const sender = req.user._id
  const {content} = req.body
  console.log(sender)
  const group = await Group.findById(groupId);
if(!group) {
  return res.status(404).json({message:"Group not found"})
}
const newMessage = await new Message({
  sender:sender , 
  reciver:recieverId , 
  content:content
})
await newMessage.save()

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
        const {userId} = req.params;
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