const Group = require("../../models/group/Group")

const isGroupOwner = async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    const ownerIdString = group.owner.toString()
    const userIdString = req.user._id.toString()

    if (ownerIdString !== userIdString) {
        return res.status(401).json({ message: "Permission Denied" });
    }

    // Set the user role to 'owner'
    req.user.role = 'owner';
    console.log(req.user.role)
    next();
}

module.exports = { isGroupOwner };
