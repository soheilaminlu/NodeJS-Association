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

  module.exports.processJoinRequest = (req , res , next) => {

  }