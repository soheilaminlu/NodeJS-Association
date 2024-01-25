const Group = require("../../models/group/Group")

const isGroupOwner = async (req, res, next) => {
    try {
        const {groupId} = req.params || req.body
        const group = await Group.findById(groupId)
        if(!group) {
            return res.status(404).json({message:"Not Found Group"})
        }
        if(group.owner.toString() === req.user._id.toString()) {
            console.log(group.owner)
            console.log(req.user._id)
          return  next()
        }
        return res.status(401).json({message:"You are not Owner of this Group"})  
    } catch (error) {
        res.status(400).json({message:"Failed to Pass owner middleware" , error:error.message})
    }
    
}

module.exports = { isGroupOwner };
