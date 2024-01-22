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
module.exports.removeMember = (req , res , next) => {
   try {
    const {groupId , memberId} = req.params;
    const group = Group.findByIdAndUpdate(groupId , {$pull:{members:memberId}})
    if(group) {
       return res.status(200).json({message:"Member Removed Successfuly"})
    }
   return res.status(404).json({message:"Group Not Found"})
   } catch (error) {
    return res.status(401).json({message:"Internal Server Error" , error:error.message})
   }
}