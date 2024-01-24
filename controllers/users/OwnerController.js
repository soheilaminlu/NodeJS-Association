const JoinRequest = require("../../models/User/JoinRequest")
const Group = require("../../models/group/Group")

module.exports.listJoinRequests = async (req, res, next) => {
    try {
      const { groupId } = req.params;
  
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
  
      const joinRequests = await JoinRequest.find({ groupId: groupId })
        .populate('userId', 'username')  // Populate the userId field with username
        .populate('groupId', 'name')    // Populate the groupId field with group name (adjust as needed)
  
      const formattedJoinRequests = joinRequests.map(joinRequest => ({
        requestId : joinRequest._id , 
        userId: joinRequest.userId._id,
        username: joinRequest.userId.username,
        groupId: joinRequest.groupId._id,
        groupName: joinRequest.groupId.name,
        status: joinRequest.status,
        
      }));
  
      res.status(200).json({ message: "Join requests successfully loaded", joinRequests: formattedJoinRequests });
    } catch (error) {
      res.status(500).json({ message: "Failed to load Join Requests", error: error.message });
    }
  };

  module.exports.processJoinRequest = async(req , res , next) => {
    try{
        const {requestId , action} = req.params;
        const {groupId} = req.body
        const group = await Group.findById(groupId);
        
        const joinRequest = await JoinRequest.findById(requestId)
        if(!joinRequest) {
        return res.status(404).json({message:"Not Found Join Request"});
        }
        if(action === 'accept') {
        joinRequest.status === 'accept'
        await joinRequest.save()
         if(group.members && group.members.includes(joinRequest.userId)) {
        return res.status(400).json({message:"you are the member of this Group"})
         }  
         const userJoined = await Group.findByIdAndUpdate(groupId , {$push:{members:joinRequest.userId} })
      return res.status(200).json({message:"User Joined to Group" , group:userJoined})
        }
        if(action ==='reject') {
            joinRequest.status === 'reject'
            return res.status(200).json({message:'rejected request by owner'})
        }
    }catch(error) {
     res.status(401).json({error:error.message})
    }
}
module.exports.removeMember = async (req , res , next) => {
  try {
    const { groupId, memberId } = req.params;
    const group = await Group.findByIdAndUpdate(groupId, { $pull: { members: memberId } }, { new: true });

    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }

    if (group.members && group.members.includes(memberId)) {
        // Member is still in the group, removal failed
        return res.status(404).json({ message: "Member does not exist in the group or removal failed" });
    }

    return res.status(200).json({ message: "Member removed successfully", member: memberId });
} catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
}
}
module.exports.addMember =  async (req , res , next) => {
  try {
    const {groupId , memberId} = req.params
const group = await Group.findById(groupId)
if (group.members && group.members.includes(memberId)) {
  return res.status(200).json({message:"Member does exist in the Group"})
}
const groupUpdated = await Group.findByIdAndUpdate(groupId, { $push: { members: memberId } }, { new: true });
res.status(200).json({message:"Member added Successfuly" , groupUpdated:groupUpdated})
  } catch (error) {
    res.status(401).json({message:"Failed to Add Member" , error:error.message})
  }
}