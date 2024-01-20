const JoinRequest = require("../../models/User/JoinRequest")
const Group = require("../../models/group/Group")

module.exports.listJoinRequests = async (req , res , next) => {
    const {groupId} = req.params
    try{
        const group = await Group.findById(groupId);
        if(!group) {
        return res.status(404).json({message:"Not Found Group"});
        }
        console.log(group)
        const joinRequests = group.joinRequests;
        res.status(200).json({joinRequests:joinRequests});
    }catch(error) {
        res.status(404).json({message:"Not found Group"});
    }
     
}